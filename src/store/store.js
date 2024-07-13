import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import appReducer from "./features/app/appSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const history = createBrowserHistory();
const persistConfig = {
  key: "docqna",
  storage,
};

const combinedReducer = combineReducers({
  app: appReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "app/logoutUser") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore(
  {
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  },
  history
);

export const persistor = persistStore(store);
