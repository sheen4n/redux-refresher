import customStore from './customStore';
import reduxStore from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const USE_CUSTOM_STORE = true;
let store;

if (!USE_CUSTOM_STORE) {
  store = reduxStore;
} else {
  store = customStore;
}

const unsubscribe = store.subscribe(() => {
  console.log('Store changed', store.getState());
});

store.dispatch(bugAdded('First Bug'));

store.dispatch(bugResolved(1));
unsubscribe();
store.dispatch(bugRemoved(1));

console.log(store.getState());
