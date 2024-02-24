import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToaster } from "./userSlice";
import axios from "axios";
//
//
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (navigate, { dispatch }) => {
    try {
      dispatch(resetTasks());
      const response = await axios("/api/tasks");
      const data = await response.data;
      const result = await data.data;
      return result;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setToaster({ isOpen: false, text: "", type: "" }));
        dispatch(
          setToaster({
            isOpen: true,
            text: "Unauthorized User!",
            type: "error",
          })
        );
        navigate("/");
        return;
      }
      dispatch(setToaster({ isOpen: false, text: "", type: "" }));
      dispatch(
        setToaster({
          isOpen: true,
          text: error?.response?.data?.error || error,
          type: "error",
        })
      );
    }
  }
);
//
export const addTask = createAsyncThunk(
  "tasks/addTasks",
  async (body, { dispatch }) => {
    try {
      await axios.post("/api/tasks", body);
      dispatch(fetchTasks());
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || error);
    }
  }
);
//
export const updateTask = createAsyncThunk(
  "tasks/updateTasks",
  async (body, { dispatch }) => {
    try {
      await axios.put("/api/tasks", body);
      dispatch(fetchTasks());
    } catch (error) {
      dispatch(setToaster({ isOpen: false, text: "", type: "" }));
      dispatch(
        setToaster({
          isOpen: true,
          text: error?.response?.data?.error || error,
          type: "error",
        })
      );
    }
  }
);
//
export const deleteTask = createAsyncThunk(
  "tasks/deleteTasks",
  async (taskId, { dispatch }) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      dispatch(fetchTasks());
    } catch (error) {
      dispatch(setToaster({ isOpen: false, text: "", type: "" }));
      dispatch(
        setToaster({
          isOpen: true,
          text: error?.response?.data?.error || error,
          type: "error",
        })
      );
    }
  }
);

//
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
    editTaskData: {},
  },
  reducers: {
    resetTasks: (state) => {
      state.tasks = [];
      state.status = "idle";
      state.error = null;
      state.editTaskData = {};
    },
    editTaskData: (state, action) => {
      state.editTaskData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        // state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
        // state.tasks = [];
      })
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetTasks, editTaskData } = tasksSlice.actions;

export default tasksSlice.reducer;
