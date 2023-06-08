import { createAccount } from "./createAccount";
import { parseEther } from "viem";
import type {
  SendUserOperationResult,
  SmartAccountProvider,
  BaseSmartContractAccount,
} from "@alchemy/aa-core";
import type { Transport } from "viem";

const ADDR = "0x361Da2Ca3cC6C1f37d2914D5ACF02c4D2cCAC43b";

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Seperating the logic to create the account, and the logic to send the transaction
 */
export async function main() {
  const accountOwner: SmartAccountProvider<Transport> & {
    account: BaseSmartContractAccount<Transport>;
  } = await createAccount();

  const amountToSend: bigint = parseEther("0.001");

  const tx: SendUserOperationResult = await accountOwner.sendUserOperation(
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
