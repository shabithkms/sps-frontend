import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'studentSlice',
  initialState: {
    Student: {},
  },
  reducers: {
    update_student: (state, action) => {
      state.Student = { ...action.payload };
    },
  },
});

export const { update_student } = studentSlice.actions;

export default studentSlice.reducer;
