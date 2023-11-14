const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "socket",
  initialState: [],
  reducers: {
    add3(state, action) {
      state.push(action.payload);
    },
    remove3(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    clearcart3(state, action) {
      while (state.length > 0) {
        state.pop();
      }
    },
  },
});

export const { add3, remove3, clearcart3 } = cartSlice.actions;
export default cartSlice.reducer;
