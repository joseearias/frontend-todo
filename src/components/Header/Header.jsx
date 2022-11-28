import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <AssignmentIcon sx={{ m: 1 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
