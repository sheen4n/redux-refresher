import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import toast from './middleware/toast';
import logger from './middleware/logger';
// import func from './middleware/func'; // implemented in thunk
import reducer from './reducer';

// getDefault Middleware is all the default middlewares including thunk

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger({ destination: 'console' }), toast, api],
  });
}
