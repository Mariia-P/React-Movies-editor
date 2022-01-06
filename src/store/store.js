/* eslint-disable no-underscore-dangle */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import movieListReducer from './reducers/movieListReducer';

// eslint-disable-next-line no-unused-vars
const customMiddleWare = (store) => (next) => (action) => {
  console.log('Action that was triggered:', action.type);

  next(action);
};

// eslint-disable-next-line no-unused-vars
const checkUserAuthMiddleWare = (store) => (next) => (action) => {
  if (action.type === 'auth/registerUser') {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];
    const isAlreadyRegisteredUser = users.some(
      ({ email }) => email === action.payload.email,
    );
    if (isAlreadyRegisteredUser) {
      next({ ...action, type: 'auth/registeredFromWrongPage' });
      return;
    }
    users.push(action.payload);
    localStorage.setItem('users', JSON.stringify(users));
    next({ ...action, type: 'auth/authenticateUser' });
    return;
  }

  if (action.type === 'auth/loginUser') {
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];
    const isAlreadyRegisteredUser = users.some(
      ({ email }) => email === action.payload.email,
    );
    if (!isAlreadyRegisteredUser) {
      next({ ...action, type: 'auth/loginFromWrongPage' });
      return;
    }
    next({ ...action, type: 'auth/authenticateUser' });
    return;
  }

  next(action);
};

export default configureStore({
  reducer: {
    movies: movieListReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(customMiddleWare, checkUserAuthMiddleWare),
});
