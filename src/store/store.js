import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import cartReducer2 from "./cartSlice2";
import cartReducer3 from "./cartSlice3";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  socket: cartReducer3,
  cart: cartReducer,
  frontEndDataSearch: cartReducer2,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
