// SNA = Store, Next, Action

const logger = (param) => (store) => (next) => (action) => {
  // console.log('logging to params:', param);
  // console.log('store', store); // Just to see what is in pseudo store
  // console.log('next', next); // See what is next
  console.log('action', action); // See what is the action and payload
  next(action); // calls next, if is last middleware ,next = reducer
};

export default logger;
