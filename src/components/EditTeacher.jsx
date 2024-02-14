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
// import { editStudent } from "../app/student/studentSlice";
// import { editTeacher } from "../app/teacher/teacherSlice";
import { editTeacher } from "../app/teacher/teacherSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditTeacher = ({ openEdit, setOpenEdit, teacherEdit }) => {
  const [teacher, setTeacher] = useState(teacherEdit);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTeacher(teacher));
    setOpenEdit(false);
    setTeacher({
      ...teacher,
      firstName: "",
      lastName: "",
      age: "",
    });
  };

  return (
    <Dialog
      open={openEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenEdit(false)}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEdit(false)} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeacher;
