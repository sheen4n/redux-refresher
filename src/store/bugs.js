import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Reducer
let lastId = 0;

// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
    bugRemoved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { bugAdded, bugResolved, bugRemoved } = slice.actions;
export default slice.reducer;

// selectors to encapuslate logic to get computed state without memoization
// export const getUnresolvedBugs = (state) => state.entities.bugs.filter((bug) => !bug.resolved);

// Memoization to optimize selectors
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved),
);

// Memoized example 2 (just silly example)
export const getItemsWithIdOne = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => [...bugs, ...projects].filter((item) => item.id === 1),
);
