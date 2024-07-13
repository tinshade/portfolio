/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Provider } from "react-redux";
// import * as serviceWorker from "./serviceWorker";
import App from "./App";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        style={{ width: "40rem", padding: "20px", borderRadius: "8px" }}
      />
      <App />
    </PersistGate>
  </Provider>
);

serviceWorker.unregister();
