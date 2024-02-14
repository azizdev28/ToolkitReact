import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  teachers: [],
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  "teacher/fetchTeacher",
  async () => {
    try {
      const res = await axios.get("http://localhost:3000/teachers");
      const data = await res.data;
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addTeacher = createAsyncThunk(
  "teacher/addTeacher",
  async (teacher) => {
    try {
      await axios.post("http://localhost:3000/teachers", teacher);
    } catch (error) {
      return error.message;
    }
  }
);

export const editTeacher = createAsyncThunk(
  "teacher/editTeacher",
  async (teacher) => {
    try {
      await axios.put(`http://localhost:3000/teachers/${teacher.id}`, teacher);
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/deleteTeacher",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teachers/${id}`);
    } catch (error) {
      return error.message;
    }
  }
);

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
      state.error = null;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.loading = false;
      state.teachers = [];
      state.error = action.payload;
    });
    builder.addCase(addTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTeacher.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editTeacher.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(editTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeacher.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const teacherReducer = teacherSlice.reducer;
