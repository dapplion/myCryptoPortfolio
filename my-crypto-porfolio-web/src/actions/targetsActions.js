export const updateTarget = ({ target, id }) => ({
  type: "UPDATE_TARGETS",
  upload: true,
  targets: {
    [id]: target
  }
});

export const updateCredentials = account => ({
  type: "UPDATE_CREDENTIALS",
  payload: account
});

export const updateState = state => ({
  type: "UPDATE_STATE",
  state
});
