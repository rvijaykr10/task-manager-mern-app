import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
// register
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (body, { dispatch }) => {
    try {
      const response = await axios.post("/api/users", body);
      const data = await response?.data;
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(setToaster({ isOpen: false, text: "", type: "" }));
      dispatch(
        setToaster({
          isOpen: true,
          text: "Successfully Registered!",
          type: "info",
        })
      );
      return data;
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

// login
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (body, { dispatch }) => {
    try {
      const response = await axios.post("/api/users/auth", body);
      const { data } = response;
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(setToaster({ isOpen: false, text: "", type: "" }));
      dispatch(setToaster({ isOpen: true, text: "Logged In!", type: "info" }));
      return data;
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

// logout
export const logoutUser = createAsyncThunk("users/logoutUser", async (body) => {
  try {
    await axios.post("/api/users/logout", body);
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
    toaster: { isOpen: false, text: "", type: "" },
  },
  reducers: {
    logout: (state, action) => {
      state.userInfo = {};
      localStorage.clear();
      state.toaster = { isOpen: true, text: "Logged Out!", type: "info" };
    },
    setToaster: (state, action) => {
      state.toaster = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "";
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
        state.status = "";
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
        state.status = "";
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

export const { logout, setToaster } = usersSlice.actions;

export default usersSlice.reducer;
