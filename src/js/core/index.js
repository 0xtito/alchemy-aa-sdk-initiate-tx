import { createAccount } from "./createAccount";
import { parseEther } from "viem";

const ADDR = "0x361Da2Ca3cC6C1f37d2914D5ACF02c4D2cCAC43b";

/**
 * @description Creates a smart contract account, and sends ETH to the specified address (could be an EOA or SCA)
 * @note Seperating the logic to create the account, and the logic to send the transaction
 */
export async function main() {
  const signer = await createAccount();

  const amountToSend = parseEther("0.0005");

  const tx = await signer.sendUserOperation(ADDR, "0x", amountToSend);

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
