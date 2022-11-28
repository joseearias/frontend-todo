import React, { useState, useContext } from "react";

import { Box, Button, MenuItem, TextField } from "@mui/material";
import TodoContext from "../../store/todo-context";

const SearchForm = (props) => {
  const [searchName, setSearchName] = useState("");
  const [searchPriority, setSearchPriority] = useState("All");
  const [searchState, setSearchState] = useState("All");

  const todoCtx = useContext(TodoContext);

  const searchNameHandler = (event) => {
    setSearchName(event.target.value);
  };

  const searchPriorityHandler = (event) => {
    setSearchPriority(event.target.value);
  };

  const searchStateHandler = (event) => {
    setSearchState(event.target.value);
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();

    const searchObj = {
      searchName: searchName,
      searchPriority: searchPriority,
      searchState: searchState,
    };

    todoCtx.onSearch(searchObj);
  };

  const showAllHandler = (event) => {
    const searchObj = {
      searchName: "",
      searchPriority: "All",
      searchState: "All",
    };

    setSearchName("");
    setSearchPriority("All");
    setSearchState("All");

    console.log("Hey moda foca");

    todoCtx.onSearch(searchObj);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "10px",
      }}
      autoComplete="off"
      onSubmit={submitSearchHandler}
    >
      <TextField
        id="search-name"
        value={searchName}
        onChange={searchNameHandler}
        label="Name"
        variant="outlined"
        size="small"
        sx={{ width: "200px" }}
      />
      <TextField
        id="search-priority"
        select
        label="Priority"
        value={searchPriority}
        onChange={searchPriorityHandler}
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
      >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Low"}>Low</MenuItem>
        <MenuItem value={"Medium"}>Medium</MenuItem>
        <MenuItem value={"High"}>High</MenuItem>
      </TextField>
      <TextField
        id="search-state"
        select
        label="State"
        value={searchState}
        onChange={searchStateHandler}
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
      >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"Done"}>Done</MenuItem>
        <MenuItem value={"Undone"}>Undone</MenuItem>
      </TextField>
      <Button variant="contained" type="submit">
        Search
      </Button>
      <Button
        variant="contained"
        onClick={showAllHandler}
        sx={{ fontSize: "8px" }}
      >
        Show All
      </Button>
    </Box>
  );
};

export default SearchForm;
