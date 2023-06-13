import { createAccount } from "./createAccount";
import { parseEther } from "viem";
import type { SendUserOperationResult } from "@alchemy/aa-core";

const ADDR = "0xc53bf942c381A14036675502Ae69A54595f9c2A8"; // replace with the adress you want to send ETH to

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Seperating the logic to create the account, and the logic to send the transaction
 */
export async function main() {
  const signer = await createAccount();

  const amountToSend: bigint = parseEther("0.001");

  const tx: SendUserOperationResult = await signer.sendUserOperation(
    ADDR,
    "0x",
    amountToSend
  );

  return tx;
}

main()
  .then((receipt) => {
    console.log("Transaction receipt: ", receipt);
  })
  .catch((err) => {
    console.error("Error: ", err);
  })
  .finally(() => {
    console.log("Done");
  });
