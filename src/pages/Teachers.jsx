// Teachers.jsx
import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Pagination,
} from "@mui/material";
import { Actions, Loader, AddTeacher, EditTeacher } from "./../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacher, fetchTeachers } from "./../app/teacher/teacherSlice";

const Teachers = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [teacherEdit, setTeacherEdit] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { loading, teachers, error } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [openAdd, openEdit]);

  const handleEdit = (teacherId) => {
    const teacher = teachers.find((tch) => tch.id === teacherId);
    setTeacherEdit(teacher);
    setOpenEdit(true);
  };

  const handleDelete = (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      dispatch(deleteTeacher(teacherId));
      dispatch(fetchTeachers());
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {openAdd && <AddTeacher openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {openEdit && (
        <EditTeacher
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          teacherEdit={teacherEdit}
        />
      )}
      <Stack
        direction="row"
        sx={{
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Teachers</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add
        </Button>
      </Stack>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {loading ? <Loader /> : null}
      {error ? (
        <Typography
          variant="h4"
          color="error"
          sx={{ textAlign: "center", paddingTop: "20px" }}
        >
          {error.message}
        </Typography>
      ) : null}
      {currentItems.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((teacher, index) => (
                <TableRow
                  key={teacher.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{teacher.firstName}</TableCell>
                  <TableCell>{teacher.lastName}</TableCell>
                  <TableCell>{teacher.age}</TableCell>
                  <TableCell>{teacher.group}</TableCell>
                  <TableCell>
                    <Actions
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      teacherId={teacher.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <Pagination
        count={Math.ceil(filteredTeachers.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default Teachers;
