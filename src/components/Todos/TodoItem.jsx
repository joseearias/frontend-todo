import React from "react";

import { Typography } from "@mui/material";

const TodoItem = (props) => {
  return (
    <li>
      <Typography variant="p">{props.name}</Typography>
    </li>
  );
};

export default TodoItem;
