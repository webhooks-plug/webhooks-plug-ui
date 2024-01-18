import {
  configureStore,
  combineReducers,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import appReducer from "./appStore";

const allReducers = combineReducers({
  app: appReducer,
});

const rootReducer: Reducer<RootState> = (
  state: RootState | undefined,
  action: AnyAction
) => {
  return allReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof allReducers>;
export type AppDispatch = typeof store.dispatch;
