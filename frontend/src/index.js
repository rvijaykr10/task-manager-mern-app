import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./slices/store.js";
const App = lazy(() => import("./App.jsx"));
import { createRoot } from "react-dom/client";
const About = lazy(() => import("./components/About/About.jsx"));
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Tasklist = lazy(() => import("./components/Tasklist/Tasklist.jsx"));
const Login = lazy(() => import("./components/Login/Login.jsx"));
const Register = lazy(() => import("./components/Register/Register.jsx"));
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </Provider>
);
