import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register, type RegisterRequest } from '../../api/auth';

type AuthState = {
  registerStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  registerError: string | null;
};

const initialState: AuthState = {
  registerStatus: 'idle',
  registerError: null,
};

export const registerUser = createAsyncThunk<true, RegisterRequest, { rejectValue: string }>(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      return await register(payload);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err ?? 'Request failed');
      return rejectWithValue(message || 'Request failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearRegisterError: (state) => {
      state.registerError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.registerError = action.payload ?? action.error.message ?? 'Request failed';
      });
  },
});

export const { clearRegisterError } = authSlice.actions;
export default authSlice.reducer;
