// Actions.jsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";

const Actions = ({ handleEdit, handleDelete, teacherId }) => {
  return (
    <Stack direction="row" spacing={3}>
      <IconButton color="primary" onClick={() => handleEdit(teacherId)}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(teacherId)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default Actions;
