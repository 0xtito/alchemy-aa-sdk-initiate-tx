import {
  type SimpleSmartAccountOwner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
} from "@alchemy/aa-core";
import { privateKeyToAccount, mnemonicToAccount } from "viem/accounts";
import { toHex } from "viem/utils";
import { sepolia } from "viem/chains";
import createSigner from "./createSigner";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const FILENAME = "accountInfo.json";
const __dirname = import.meta.url.split("/scripts")[0].split("file://")[1];

const PRIV_KEY = process.env.PRIV_KEY!;
const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

async function main() {
  const signer = await createSigner();

  const counterfactualAddress = await signer.account.getAddress();

  const filePath = path.join(__dirname, FILENAME);
  let data = {};

  data["counterfactualAddress"] = counterfactualAddress;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return counterfactualAddress;
}

main().then((address) => {
  console.log("Your counterfactual address: ", address);
});
