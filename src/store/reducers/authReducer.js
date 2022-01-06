/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: 'test@gmail.com',
  password: '123456',
  isAlreadyRegistered: false,
  isNotAlreadyRegistered: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, { payload }) => {
      state.email = payload.email;
      state.password = payload.password;
      state.isAlreadyRegistered = false;
      state.isNotAlreadyRegistered = false;
    },
    logoutUser: (state) => {
      state.isAlreadyRegistered = false;
      state.isNotAlreadyRegistered = false;
      state.email = null;
      state.password = null;
    },
    registeredFromWrongPage: (state) => {
      state.isNotAlreadyRegistered = false;
      state.isAlreadyRegistered = true;
    },

    loginFromWrongPage: (state) => {
      state.isAlreadyRegistered = false;
      state.isNotAlreadyRegistered = true;
    },
  },
});

export default authSlice.reducer;
