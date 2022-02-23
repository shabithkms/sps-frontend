import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: {
    student: {},
  },
  reducers: {
    update_student: (state, action) => {
      state.student = { ...action.payload };
    },
    student_logout: (state) => {
      state.student = null;
      localStorage.removeItem('student');
    },
  },
});

export const { update_student,student_logout } = studentSlice.actions;

export default studentSlice.reducer;
