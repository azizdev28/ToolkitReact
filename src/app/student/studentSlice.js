import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  students: [],
  error: null,
};

export const fetchStudents = createAsyncThunk(
  'student/fetchStudent',
  async () => {
    try {
      const res = await axios.get('http://localhost:3000/students');
      const data = await res.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (student) => {
    try {
      await axios.post('http://localhost:3000/students', student);
    } catch (error) {
      return error.message;
    }
  }
);

export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (student) => {
    try {
      await axios.put(`http://localhost:3000/students/${student.id}`, student);
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
    } catch (error) {
      return error.message;
    }
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.students = [];
      state.error = action.payload;
    });
    builder.addCase(addStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStudent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editStudent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(editStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteStudent.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const studentReducer = studentSlice.reducer;
