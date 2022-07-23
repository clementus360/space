import { configureStore, AnyAction, Store } from "@reduxjs/toolkit";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import mediaConstraintsReducer from "./mediastreamSlice";
import roomInfoReducer from "./roomSlice";

const store = configureStore({
  reducer: {
    mediaConstraints: mediaConstraintsReducer,
    roomInfo: roomInfoReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
