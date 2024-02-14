import React, { useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { Actions, Loader, AddStudent, EditStudent } from "./../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, fetchStudents } from "./../app/student/studentSlice";
import Pagination from "@mui/lab/Pagination";

const Students = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [studentEdit, setStudentEdit] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(""); // Guruhlarni saqlash uchun
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const { loading, students, error } = useSelector((state) => state.student);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchStudents());
  }, [openAdd, openEdit]);

  const handleEdit = (studentId) => {
    const student = students.find((st) => st.id === studentId);
    setStudentEdit(student);
    setOpenEdit(true);
  };

  const handleDelete = (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(studentId));
      dispatch(fetchStudents());
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedGroup === "" || student.group === selectedGroup) // Filter by group
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Unique group list for Select menu
  const groupList = Array.from(
    new Set(students.map((student) => student.group))
  );

  return (
    <div>
      {openAdd && <AddStudent openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {openEdit && (
        <EditStudent
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          studentEdit={studentEdit}
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
        <Typography variant="h4">Students</Typography>
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

      <Select
        aria-multiline
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        fullWidth
        sx={{ marginBottom: "20px" }}
      >
        <MenuItem value="">All Groups</MenuItem>

        {groupList.map((group) => (
          <MenuItem key={group} value={group}>
            {group}
          </MenuItem>
        ))}
      </Select>

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
                <TableCell>Avatar</TableCell>
                <TableCell>Firstname</TableCell>
                <TableCell>Lastname</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((student, index) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      src={student.avatar}
                      alt={student.firstName}
                    />
                  </TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.group}</TableCell>
                  <TableCell>{student.teacher}</TableCell>
                  <TableCell>
                    <Actions
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      teacherId={student.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <Pagination
        count={Math.ceil(filteredStudents.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default Students;
