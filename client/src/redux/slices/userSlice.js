import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      const { user = '', accessToken = '' } = action.payload;
      state.user = user;
      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
