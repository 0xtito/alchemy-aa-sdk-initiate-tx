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

  const amountToSend: bigint = parseEther("0.0001");

  const result: SendUserOperationResult = await signer.sendUserOperation({
    target: ADDR,
    data: "0x",
    value: amountToSend,
  });

  console.log("User operation result: ", result);

  console.log(
    "Waiting for the user operation to be included in a mined transaction..."
  );

  const txHash = await signer.waitForUserOperationTransaction(
    result.hash as `0x${string}`
  );

  console.log("Transaction hash: ", txHash);

  const userOpReceipt = await signer.getUserOperationReceipt(
    result.hash as `0x${string}`
  );

  console.log("User operation receipt: ", userOpReceipt);

  const txReceipt = await signer.rpcClient.waitForTransactionReceipt({
    hash: txHash,
  });

  return txReceipt;
}

main()
  .then((txReceipt) => {
    console.log("Transaction receipt: ", txReceipt);
  })
  .catch((err) => {
    console.error("Error: ", err);
  })
  .finally(() => {
    console.log("Done");
  });
