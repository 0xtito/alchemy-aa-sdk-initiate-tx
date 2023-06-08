import {
  type SimpleSmartAccountOwner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
  createPublicErc4337Client,
} from "@alchemy/aa-core";
import { privateKeyToAccount, mnemonicToAccount } from "viem/accounts";
import { toHex } from "viem/utils";
import { sepolia, polygonMumbai } from "viem/chains";
import { chains } from "@alchemy/aa-core";
import * as dotenv from "dotenv";
dotenv.config();

const PRIV_KEY = process.env.PRIV_KEY!;
const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

export async function createAccount() {
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);
  // const account = mnemonicToAccount(MNEMONIC_PHRASE);

  const owner: SimpleSmartAccountOwner = {
    signMessage: async (msg) =>
      account.signMessage({
        message: toHex(msg),
      }),
    getAddress: async () => account.address,
  };

  // createPublicErc4337Client

  const chain = sepolia;
  const provider = new SmartAccountProvider(
    ALCHEMY_API_URL,
    ENTRYPOINT_ADDRESS,
    chain
  );

  // console.log(await provider.getAddress());

  const signer = provider.connect(
    (provider) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient: provider,
      })
  );

  const accountAddress = await signer.getAddress();
  console.log("Account address: ", accountAddress);

  // ALREADY RAN
  // const tx = await signer.sendUserOperation(accountAddress, "0x", 0n);
}
