import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import { Box, Button, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AddForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredPriority, setEnteredPriority] = useState("");
  const [enteredDate, setEnteredDate] = useState(null);

  const handleNameChange = (event) => {
    setEnteredName(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setEnteredPriority(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const dueDate = enteredDate === null ? null : enteredDate.toISOString();

    const newTodo = {
      id: uuid(),
      name: enteredName,
      priority: enteredPriority,
      dueDate: dueDate,
    };
    console.log(newTodo);
    props.onNewTodo(newTodo);
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
        value={enteredName}
        onChange={handleNameChange}
      />
      <TextField
        id="priority"
        required
        select
        label="Priority"
        variant="outlined"
        value={enteredPriority}
        onChange={handlePriorityChange}
      >
        <MenuItem value={"Low"}>Low</MenuItem>
        <MenuItem value={"Medium"}>Medium</MenuItem>
        <MenuItem value={"High"}>High</MenuItem>
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={enteredDate}
          onChange={(newDate) => {
            setEnteredDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button variant="contained" type="submit">
        Add Todo
      </Button>
    </Box>
  );
};

export default AddForm;
