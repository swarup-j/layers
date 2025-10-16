// src/features/auth/authSlice.ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState, AppDispatch } from "@/store/store";

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};
export const loginUser = createAsyncThunk<
  { token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email,
      password,
    });

    // Return token only, since no user object
    return { token: response.data.accesstoken };
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return thunkAPI.rejectWithValue(message);
  }
});

// create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can add sync reducers here if needed (e.g., logout)
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

// export actions and reducer
export const { logout } = authSlice.actions;

// default export of reducer for easy import
export default authSlice.reducer;
