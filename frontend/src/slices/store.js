import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice.js";
import usersReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});
