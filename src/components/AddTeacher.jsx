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
import { addTeacher, fetchTeachers } from "../app/teacher/teacherSlice";

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

const AddTeacher = ({ openAdd, setOpenAdd }) => {
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTeacher(teacher));
    setOpenAdd(false);
    setTeacher({
      ...teacher,
      firstName: "",
      lastName: "",
      age: "",
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
              value={teacher.firstName}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
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
              value={teacher.lastName}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
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
              value={teacher.age}
              onChange={(e) =>
                setTeacher({
                  ...teacher,
                  age: e.target.value,
                })
              }
            />
          </Stack>

          <Stack sx={{ paddingBottom: "24px" }}>
            <FormControl fullWidth>
              <InputLabel id="group">level</InputLabel>
              <Select
                labelId="group"
                id="group"
                name="group"
                value={teacher.group}
                label="group"
                onChange={(e) =>
                  setTeacher({
                    ...teacher,
                    group: e.target.value,
                  })
                }
              >
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Middle">Middle</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
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

export default AddTeacher;
