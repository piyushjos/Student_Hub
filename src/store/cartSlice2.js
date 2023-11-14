const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "frontEndDataSearch",
  initialState: [],
  reducers: {
    add1(state, action) {
      state.push(action.payload);
    },
    remove1(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    clearcart1(state, action) {
      while (state.length > 0) {
        state.pop();
      }
    },
  },
});

export const { add1, remove1, clearcart1 } = cartSlice.actions;
export default cartSlice.reducer;
