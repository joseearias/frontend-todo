import { Checkbox } from "@mui/material";
import React, { useState } from "react";

const TodoCheckbox = (props) => {
  const isChecked = props.checked === true ? true : false;

  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event) => {
    if (!checked) {
      setChecked(true);
      props.onChecked(props.todoId);
    } else {
      setChecked(false);
      props.onUnchecked(props.todoId);
    }
  };

  return <Checkbox checked={checked} onChange={handleChange} />;
};

export default TodoCheckbox;
