import { forwardRef, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { addStudent, fetchStudents } from "../app/student/studentSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddStudent = ({ openAdd, setOpenAdd }) => {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    group: "",
    teacher: "",
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(student));
    setOpenAdd(false);
    setStudent({
      ...student,
      firstName: "",
      lastName: "",
      age: "",
      group: "",
      teacher: "",
    });
  };

  return (
    <Dialog
      open={openAdd}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add student</DialogTitle>
      <DialogContent>
        <form style={{ width: "400px" }}>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Firstname"
              variant="standard"
              id="firstName"
              name="firstName"
              value={student.firstName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  firstName: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Lastname"
              variant="standard"
              id="lastName"
              name="lastName"
              value={student.lastName}
              onChange={(e) =>
                setStudent({
                  ...student,
                  lastName: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <TextField
              label="Age"
              variant="standard"
              id="age"
              name="age"
              value={student.age}
              onChange={(e) =>
                setStudent({
                  ...student,
                  age: e.target.value,
                })
              }
            />
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <FormControl fullWidth>
              <InputLabel id="group">Group</InputLabel>
              <Select
                labelId="group"
                id="group"
                name="group"
                value={student.group}
                label="group"
                onChange={(e) =>
                  setStudent({
                    ...student,
                    group: e.target.value,
                  })
                }
              >
                <MenuItem value="React N32">React N32</MenuItem>
                <MenuItem value="React N45">React N45</MenuItem>
                <MenuItem value="React N50">React N50</MenuItem>
                <MenuItem value="React N58">React N58</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <FormControl fullWidth>
              <InputLabel id="teacher">Teacher</InputLabel>
              <Select
                labelId="teacher"
                id="teacher"
                name="teacher"
                value={student.teacher}
                label="teacher"
                onChange={(e) =>
                  setStudent({
                    ...student,
                    teacher: e.target.value,
                  })
                }
              >
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Bruce Wayne">Bruce Wayne</MenuItem>
                <MenuItem value="Temur Shernazarov">Temur Shernazarov</MenuItem>
                <MenuItem value="Shohjahon Muhammadiyev">
                  Shohjahon Muhammadiyev
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack sx={{ paddingBottom: "24px" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                id="avatar"
                name="avatar"
                onChange={(e) =>
                  setStudent({
                    ...student,
                    avatar: e.target.files && e.target.files[0],
                  })
                }
              />
            </Button>
            <div>{student.avatar && student.avatar.name}</div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStudent;
