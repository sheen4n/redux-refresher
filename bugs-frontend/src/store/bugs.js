import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

// ------
// Reducers
// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // command - event
    // addBug - bugAdded
    bugAdded: (state, action) => {
      state.list.push(action.payload); //Payload comes from the response of the server after added
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      console.log(action);
      state.list[index].resolved = true;
    },
    bugAssigned: (state, action) => {
      const { id: bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === bugId);
      state.list[index].userId = userId;
    },
    bugsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.lastFetch = Date.now();
    },
    bugsRequested: (state, action) => {
      state.loading = true;
    },
    bugsRequestFail: (state, action) => {
      state.loading = false;
    },
  },
});

const {
  bugAdded,
  bugResolved,
  bugAssigned,
  bugsReceived,
  bugsRequested,
  bugsRequestFail,
} = slice.actions;
export default slice.reducer;

// ------
// Configurations - Can be put in separate file

const url = '/bugs';

// ------
// Action Creators

// Original Action Creator
// Creates an action object
// Signature () => {}
// export const loadBugs = () =>
//   apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFail.type,
//   });

// Upgraded Signature () => fn(dispatch, getState)
// Why upgrade? So we can use thunk. Thunk can take in function with fn(dispatch, getState) signature so we can have logic
export const loadBugs = () => (dispatch, getState) => {
  // Implement Caching, can abstract to a generalized solution if want to use in multiple slices
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  const validTimeframeInMinutes = 10; // Can be a Config value
  if (diffInMinutes < validTimeframeInMinutes) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFail.type,
    }),
  );
};

// Do not need complex example like thunk above because no caching logic needed.
export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = ({ bugId, userId }) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssigned.type,
  });

// ------
// selectors to encapuslate logic to get computed state without memoization
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);

// Memoization to optimize selectors
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved),
);

// Memoized example 2 (just silly example)
export const getItemsWithIdOne = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => [...bugs.list, ...projects].filter((item) => item.id === 1),
);

// Memoize Example 3
export const getListOfBugsAssignedToUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId),
  );
