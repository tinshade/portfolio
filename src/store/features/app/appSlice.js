import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../axios";

//TODO: Segregate the promises and api call logic into their own files and call them here.
const initialState = {
  isInitialized: false,
  firstLoad: true,
  user: null,
  theme: "dark",
};

const toggleThemeLogic = (state, { payload }) => {
  state.theme = payload;
};

const resetLoadingStateLogic = (state) => {
  //* Sometimes the loading state would be stuck at true even after logout causing the Login button to be stuck at a disabled state.
  //* This reducer will be able to manually set it back to false!
  state.loading = false;
};

const setFirstLoadLogic = (state, { payload }) => {
  //* firstLoad state indicates that the bunch of APIs under DashboardHome's initial load have all finished.
  // The idea is to stop navigation to other pages before all required data is loaded.
  state.firstLoad = payload?.status; //? Boolean
};

const setInitializedLogic = (state) => {
  state.isInitialized = true;
};

export const loginUserLogic = createAsyncThunk("user/login", (payload) => {
  const { username, password } = payload;

  return axiosInstance.post(
    "/auth/token/",
    JSON.stringify({
      username: username,
      password: password,
    })
  );
});

const logoutUserLogic = (state, { payload }) => {
  console.log("Payload", payload);
  state.user = null;
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const tokenRefreshLogic = createAsyncThunk(
  "token/refresh",
  (refreshToken) => {
    return axiosInstance.post(
      "/auth/token/refresh/",
      JSON.stringify({ refresh: refreshToken })
    );
  }
);

export const tokenValidationLogic = createAsyncThunk(
  "token/validate",
  (accessToken) => {
    return axiosInstance.post(
      "/auth/token/validate/",
      JSON.stringify({ token: accessToken })
    );
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetLoadingState: resetLoadingStateLogic,
    setFirstLoad: setFirstLoadLogic,
    setInitialized: setInitializedLogic,
    loginUser: loginUserLogic,
    logoutUser: logoutUserLogic,
    toggleTheme: toggleThemeLogic,
    token: tokenRefreshLogic,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserLogic.pending, (state, { payload }) => {
        console.log("Payload", payload);
        state.loading = true;
        state.user = null;
      })
      .addCase(loginUserLogic.fulfilled, (state, action) => {
        localStorage.setItem("access", action.payload.data.token.access);
        localStorage.setItem("refresh", action.payload.data.token.refresh);
        state.user = action.payload.data.user;
        state.loading = false;
      })
      .addCase(loginUserLogic.rejected, (state, { payload }) => {
        console.log("Payload", payload);
        state.user = null;
        state.loading = false;
      });
  },
});

export const {
  resetLoadingState,
  setFirstLoad,
  setInitialized,
  loginUser,
  logoutUser,
  token,
  toggleTheme,
} = appSlice.actions;
export default appSlice.reducer;
