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
// const About = lazy(() => import("./components/About/About.jsx"));
const Home = lazy(() => import("./components/Home/Home.jsx"));
const Tasklist = lazy(() => import("./components/Tasklist/Tasklist.jsx"));
const Login = lazy(() => import("./components/Login/Login.jsx"));
const Register = lazy(() => import("./components/Register/Register.jsx"));
const root = createRoot(document.getElementById("root"));
//
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index={true}
        path="/"
        element={
          // <Suspense fallback={<div>Loading...</div>}>
          <Home />
          // </Suspense>
        }
      />
      {/* <Route
        path="/about"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        }
      /> */}
      <Route
        path="/tasks"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Tasklist />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Navigate to="/" replace />
          </Suspense>
        }
      />
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
