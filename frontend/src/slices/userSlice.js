import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
// register
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (body) => {
    try {
      const response = await axios.post("/api/users", body);
      const data = await response?.data;
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || error);
    }
  }
);

// login
export const loginUser = createAsyncThunk("users/loginUser", async (body) => {
  try {
    const response = await axios.post("/api/users/auth", body);
    const { data } = response;
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error || error);
  }
});

// logout
export const logoutUser = createAsyncThunk("users/logoutUser", async (body) => {
  try {
    await axios.post("/api/users/logout", body);
  } catch (error) {
    console.error(error);
    alert(error?.response?.data?.error || error);
  }
});

//
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.userInfo = {};
      localStorage.clear();
    },
  },
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
        state.error = action.error;
        state.userInfo = {};
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
