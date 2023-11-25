import React from "react";
import { Provider } from "react-redux";
import { store } from "./slices/store.js";
import App from "./App.jsx";

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
