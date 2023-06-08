import {
  EthersProviderAdapter,
  convertWalletToAccountSigner,
} from "@alchemy/aa-ethers";
import { Alchemy, Network } from "alchemy-sdk";

// import { Wallet, AlchemyProvider } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import { SimpleSmartContractAccount, getChain } from "@alchemy/aa-core";

const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

export async function createAccount() {
  const alchemy = new Alchemy({
    apiKey: ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  });
  const provider = await alchemy.config.getProvider();
  const owner = Wallet.fromMnemonic(MNEMONIC_PHRASE);
  ("");

  const signer = EthersProviderAdapter.fromEthersProvider(
    provider,
    ENTRYPOINT_ADDRESS
  ).connectToAccount(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain: getChain(provider.network.chainId),
        owner: convertWalletToAccountSigner(owner),
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient: rpcClient,
      })
  );

  return signer;
}
