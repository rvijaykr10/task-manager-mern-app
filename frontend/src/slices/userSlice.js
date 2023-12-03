import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
// register
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (body, thunkAPI) => {
    const response = await axios.post("/api/users", body);
    const { data } = response;
    return data;
  }
);

//
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { editTaskData } = usersSlice.actions;

export default usersSlice.reducer;
