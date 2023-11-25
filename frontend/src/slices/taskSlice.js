import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios("/api/tasks");
  const data = await response.data;
  const result = await data.data;
  return result;
});
//
export const addTask = createAsyncThunk(
  "tasks/addTasks",
  async (body, thunkAPI) => {
    await axios.post("/api/tasks", body);
    thunkAPI.dispatch(fetchTasks());
  }
);
//
export const deleteTask = createAsyncThunk(
  "tasks/deleteTasks",
  async (taskId, thunkAPI) => {
    await axios.delete(`/api/tasks/${taskId}`);
    thunkAPI.dispatch(fetchTasks());
  }
);

//
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // ... other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
      });
  },
});

export default tasksSlice.reducer;
