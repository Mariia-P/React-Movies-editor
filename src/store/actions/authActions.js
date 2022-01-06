/* eslint-disable no-shadow */
import { createAction } from '@reduxjs/toolkit';

export const registerUser = createAction('auth/registerUser');
export const loginUser = createAction('auth/loginUser');
export const logoutUser = createAction('auth/logoutUser');
