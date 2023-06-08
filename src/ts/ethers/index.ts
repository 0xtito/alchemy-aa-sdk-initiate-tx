import { createAccount } from "./createAccount";
import { parseEther } from "ethers";
import type { SendUserOperationResult } from "@alchemy/aa-core";
import type { AccountSigner } from "@alchemy/aa-ethers";

const ADDR = "0x361Da2Ca3cC6C1f37d2914D5ACF02c4D2cCAC43b";

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Seperating the logic to create the account, and the logic to send the transaction
 */
export async function main() {
  const smartContractAccount: AccountSigner = await createAccount();

  const amountToSend: bigint = parseEther("0.005");

  const tx: SendUserOperationResult =
    await smartContractAccount.sendUserOperation(ADDR, "0x", amountToSend);

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
