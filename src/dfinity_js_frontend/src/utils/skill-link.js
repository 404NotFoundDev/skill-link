import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

export async function createUser(user) {
  try {
    return await window.canister.loanManager.createUser(user);
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error("Failed to create user.");
  }
}

// Function to get a User by ID
export async function getUserById(id) {
  return await window.canister.loanManager.getUserById(id);
}
