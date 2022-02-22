import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';

export default configureStore({
  reducer: {
    student: studentReducer,
  },
});
