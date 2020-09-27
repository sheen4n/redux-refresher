import { createSlice } from '@reduxjs/toolkit';

// Reducer
let lastId = 0;

// uses immer under the hood for mutable code
const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    userAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;
