import customStore from './customStore';
import reduxStore from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const USE_CUSTOM_STORE = false;
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
store.dispatch(bugAdded('Second Bug'));
store.dispatch(bugAdded('Bug 3'));
store.dispatch(bugAdded('Bug 4'));

store.dispatch(bugResolved(1));
store.dispatch(bugResolved(2));
unsubscribe();
store.dispatch(bugRemoved(1));

console.log(store.getState());
