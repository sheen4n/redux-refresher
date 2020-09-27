import configureCustomStore from './store/customStore';
import configureReduxStore from './store/configureStore';
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  bugAssigned,
  getItemsWithIdOne,
  getListOfBugsAssignedToUser,
  getUnresolvedBugs,
} from './store/bugs';
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

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

store.dispatch(userAdded({ name: 'User 1' }));
store.dispatch(userAdded({ name: 'User 2' }));
store.dispatch(userAdded({ name: 'User 3' }));

store.dispatch(projectAdded({ name: 'First Project' }));

store.dispatch(bugAdded({ description: 'First Bug' }));
store.dispatch(bugAdded({ description: '2 Bug' }));
store.dispatch(bugAdded({ description: '3 Bug' }));
store.dispatch(bugAdded({ description: '4 Bug' }));

store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugResolved({ id: 2 }));
unsubscribe();
store.dispatch(bugRemoved({ id: 2 }));

console.log(store.getState());

const a = getItemsWithIdOne(store.getState());
const b = getItemsWithIdOne(store.getState());
console.log(a === b);
console.log(a);

const c = getUnresolvedBugs(store.getState());
console.log(c);

store.dispatch(bugAssigned({ bugId: 3, userId: 1 }));

const d = getListOfBugsAssignedToUser(1)(store.getState());
console.log(d);
