import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (state, action) => {
      state.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list.splice(index, 1);
    },
    bugAssigned: (state, action) => {
      const { bugId, userId } = action.payload;
      const index = state.list.findIndex((bug) => bug.id === bugId);
      state.list[index].userId = userId;
    },
  },
});

export const { bugAdded, bugResolved, bugRemoved, bugAssigned } = slice.actions;
export default slice.reducer;

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
