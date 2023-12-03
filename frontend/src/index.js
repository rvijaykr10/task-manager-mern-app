import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./slices/store.js";
import App from "./App.jsx";

import { createRoot } from "react-dom/client";
import About from "./components/About/About.jsx";
import Home from "./components/Home/Home.jsx";
import Tasklist from "./components/Tasklist/Tasklist.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
const root = createRoot(document.getElementById("root"));
//
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tasks" element={<Tasklist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);
//
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </Provider>
);
