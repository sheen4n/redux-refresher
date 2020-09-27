const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') action(dispatch, getState);
  else next(action);
};

export default func;

// not in use as thunk automatically uses it
