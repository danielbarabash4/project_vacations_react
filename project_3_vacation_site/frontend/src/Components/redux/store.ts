import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./UserReducer";
import { VacReducer } from "./VacReducer";

const reducers = combineReducers({
  User: userReducer,
  Vacs: VacReducer,
});

export const vacation = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
