import { parseEther } from "viem";
import { privateKeyToAccount, mnemonicToAccount } from "viem/accounts";
import { createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import { toHex } from "viem/utils";
import * as dotenv from "dotenv";
dotenv.config();

import { counterfactualAddress } from "../accountInfo.json";

const PRIV_KEY = process.env.PRIV_KEY!;
const MNEMONIC_PHRASE = process.env.MNEMONIC_PHRASE!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL!;

async function main() {
  const account =
    PRIV_KEY !== ""
      ? privateKeyToAccount(`0x${PRIV_KEY}`)
      : mnemonicToAccount(MNEMONIC_PHRASE);

  const wallet = createWalletClient({
    account: account,
    chain: sepolia,
    transport: http(ALCHEMY_API_URL),
  });

  const txHash = await wallet.sendTransaction({
    to: counterfactualAddress as `0x${string}`,
    value: parseEther("0.01"),
  });

  return txHash;
}

main().then((txHash) => {
  console.log("Transation hash: ", txHash);
});
