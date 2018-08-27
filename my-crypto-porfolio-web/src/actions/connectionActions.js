export const openSocket = credentials => ({
  type: "OPEN_SOCKET",
  credentials
});

export const updateCredentials = account => ({
  type: "UPDATE_CREDENTIALS",
  payload: account
});

export const updateState = state => ({
  type: "UPDATE_STATE",
  state
});
