import React from "react";

import SearchForm from "./SearchForm";
import { Box, Paper, Typography } from "@mui/material";

const Search = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper variant="outlined" sx={{ padding: "10px" }}>
        <Typography variant="subtitle1">Search your Tasks</Typography>
        <SearchForm />
      </Paper>
    </Box>
  );
};

export default Search;
