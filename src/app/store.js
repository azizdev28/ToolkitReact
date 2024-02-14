import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './student/studentSlice';
import { teacherReducer } from './teacher/teacherSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    teacher: teacherReducer,
  },
});

export default store;
