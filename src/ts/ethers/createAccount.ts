import {
  type AccountSigner,
  EthersProviderAdapter,
  convertWalletToAccountSigner,
} from "@alchemy/aa-ethers";
import { Alchemy, Network, type AlchemyProvider } from "alchemy-sdk";
import { Wallet } from "@ethersproject/wallet";
import {
  type SimpleSmartAccountOwner,
  SimpleSmartContractAccount,
  getChain,
} from "@alchemy/aa-core";

const PRIV_KEY = process.env.PRIV_KEY!;
const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE!;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

export async function createAccount() {
  const alchemy: Alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  });
  const provider: AlchemyProvider = await alchemy.config.getProvider();

  // const walletOwner: Wallet = Wallet.fromMnemonic(MNEMONIC_PHRASE);
  const walletOwner: Wallet = new Wallet(PRIV_KEY);

  const accountOwner: SimpleSmartAccountOwner =
    convertWalletToAccountSigner(walletOwner);

  const signer: AccountSigner = EthersProviderAdapter.fromEthersProvider(
    provider,
    ENTRYPOINT_ADDRESS
  ).connectToAccount(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain: getChain(provider.network.chainId),
        owner: accountOwner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient: rpcClient,
      })
  );

  return signer;
}
