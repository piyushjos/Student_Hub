const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    clearcart(state, action) {
      while (state.length > 0) {
        state.pop();
      }
    },
  },
});

export const { add, remove, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
