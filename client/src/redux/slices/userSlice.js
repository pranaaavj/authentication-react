import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: null,
<<<<<<< HEAD
    isAuthenticated: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
=======
  },
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
>>>>>>> update-signup
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
<<<<<<< HEAD
      state.isAuthenticated = false;
=======
>>>>>>> update-signup
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
