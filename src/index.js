import store from './store';
import { bugAdded, bugRemoved, bugResolved } from './actions';

const unsubscribe = store.subscribe(() => {
  console.log('Store changed', store.getState());
});

store.dispatch(bugAdded('First Bug'));

store.dispatch(bugResolved(1));
unsubscribe();
store.dispatch(bugRemoved(1));

console.log(store.getState());
