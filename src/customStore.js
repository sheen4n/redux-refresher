import reducer from './reducer';

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.map((fn) => fn());
  };

  const subscribe = (fn) => {
    listeners.push(fn);
    return () => (listeners = []);
  };

  const getState = () => state;

  return {
    dispatch,
    getState,
    subscribe,
  };
};

const store = createStore(reducer);

export default store;
