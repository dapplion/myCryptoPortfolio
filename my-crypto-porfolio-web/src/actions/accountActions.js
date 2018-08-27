import {
  SERVER_UPDATE_ACCOUNTS,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  UPDATE_ACCOUNT
} from "./types";
import etherscan from "../etherscan";

// Exports a function which returns a function with the argument (dispatch)
export const updateAccounts = accounts => ({
  type: SERVER_UPDATE_ACCOUNTS,
  payload: accounts
});

export const addAccount = account => ({
  type: ADD_ACCOUNT,
  upload: true,
  payload: {
    account
  }
});

export const removeAccount = account => ({
  type: REMOVE_ACCOUNT,
  upload: true,
  payload: account
});

export const openSocket = () => ({
  type: "OPEN_SOCKET"
});

export const updateCredentials = account => ({
  type: "UPDATE_CREDENTIALS",
  payload: account
});
