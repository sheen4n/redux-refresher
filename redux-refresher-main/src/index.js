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
  loadBugs,
  addBug,
  resolveBug,
  assignBugToUser,
} from './store/bugs';

// Action Types
import { projectAdded } from './store/projects';
import { userAdded } from './store/users';

const USE_CUSTOM_STORE = false;
let store;

if (!USE_CUSTOM_STORE) {
  store = configureReduxStore();
} else {
  store = configureCustomStore();
}

// const unsubscribe = store.subscribe(() => {
//   console.log('Store changed', store.getState());
// });

// store.dispatch(userAdded({ name: 'User 1' }));
// store.dispatch(userAdded({ name: 'User 2' }));
// store.dispatch(userAdded({ name: 'User 3' }));

// store.dispatch(projectAdded({ name: 'First Project' }));

// store.dispatch(bugAdded({ description: 'First Bug' }));
// store.dispatch(bugAdded({ description: '2 Bug' }));
// store.dispatch(bugAdded({ description: '3 Bug' }));
// store.dispatch(bugAdded({ description: '4 Bug' }));

// store.dispatch(bugResolved({ id: 1 }));
// store.dispatch(bugResolved({ id: 2 }));
// unsubscribe();
// store.dispatch(bugRemoved({ id: 2 }));

// console.log(store.getState());

// const a = getItemsWithIdOne(store.getState());
// const b = getItemsWithIdOne(store.getState());
// console.log(a === b);
// console.log(a);

// const c = getUnresolvedBugs(store.getState());
// console.log(c);

// store.dispatch(bugAssigned({ bugId: 3, userId: 1 }));

// const d = getListOfBugsAssignedToUser(1)(store.getState());
// console.log(d);

// Ideally for store if calling api --> simulate usage of func middleware
// store.dispatch((dispatch, getState) => {
// Step 1: Call the API
// Step 2: When the promise is resolved => dispatch()
//   dispatch({ type: 'bugsReceived', bugs: [1, 2, 3] });
//   getState();
// Step 3: When the promise is rejected => dispatch()
// });

// store.dispatch(inside here is an action. action usually are objects with type property. above shows that action is a function instead of object for async)

// Test if action is error. If error, toastify and log
// store.dispatch({ type: 'error', payload: { message: 'An error occurred' } });

// Instead of using thunk, we can use custom Api Middleware. Thunk disadvantage is that the code is above as above, where we need to write the api + dispatch if resolved/ rejected everytime

// API Middleware usage example

// UI Layer - too much details, but started to use api middleware - good but not great. Too cluttered
// store.dispatch(
//   apiCallBegan({
//     url: '/bugs',
//     onSuccess: 'bugs/bugsReceived',
//   }),
// );

// UI Layer - better abstraction
store.dispatch(loadBugs());

console.log(store.getState());

// Test Caching

// setTimeout(() => store.dispatch(loadBugs()), 2000);

store.dispatch(addBug({ description: 'ABC' }));

store.dispatch(resolveBug(2));
// store.dispatch(bugResolved(1));

store.dispatch(assignBugToUser({ bugId: 3, userId: 3 }));
