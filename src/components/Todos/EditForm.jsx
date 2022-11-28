import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditForm = (props) => {
  const [updatedDate, setUpdatedDate] = useState(props.todo.dueDate);
  const [updatedName, setUpdatedName] = useState(props.todo.name);
  const [updatedPriority, setUpdatedPriority] = useState(props.todo.priority);

  const nameHandler = (event) => {
    setUpdatedName(event.target.value);
  };

  const priorityHandler = (event) => {
    setUpdatedPriority(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const dueDate = updatedDate === null ? null : updatedDate;
    const doneDate = props.todo.doneDate === null ? null : props.todo.doneDate;

    const updatedTodo = {
      id: props.todo.id,
      name: updatedName,
      priority: updatedPriority,
      state: props.todo.state,
      dueDate: dueDate,
      doneDate: doneDate,
      creationDate: props.todo.creationDate,
    };

    props.onUpdatedItem(updatedTodo);

    props.onSave();
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { marginBottom: 2, width: "100%" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <TextField
        id="name"
        required
        label="Name"
        variant="outlined"
        value={updatedName}
        onChange={nameHandler}
      />
      <TextField
        id="priority"
        required
        select
        label="Priority"
        variant="outlined"
        value={updatedPriority}
        onChange={priorityHandler}
      >
        <MenuItem value={"Low"}>Low</MenuItem>
        <MenuItem value={"Medium"}>Medium</MenuItem>
        <MenuItem value={"High"}>High</MenuItem>
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={updatedDate}
          onChange={(newDate) => {
            setUpdatedDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit">
        Save Todo
      </Button>
    </Box>
  );
};

export default EditForm;
