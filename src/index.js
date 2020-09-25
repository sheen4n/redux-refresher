import configureCustomStore from './store/customStore';
import configureReduxStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';

const USE_CUSTOM_STORE = false;
let store;

if (!USE_CUSTOM_STORE) {
  store = configureReduxStore();
} else {
  store = configureCustomStore();
}

const unsubscribe = store.subscribe(() => {
  console.log('Store changed', store.getState());
});

store.dispatch(bugAdded({ description: 'First Bug' }));
store.dispatch(bugAdded({ description: '2 Bug' }));
store.dispatch(bugAdded({ description: '3 Bug' }));
store.dispatch(bugAdded({ description: '4 Bug' }));

store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugResolved({ id: 2 }));
unsubscribe();
store.dispatch(bugRemoved({ id: 1 }));

console.log(store.getState());
