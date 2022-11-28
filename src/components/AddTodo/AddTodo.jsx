import * as React from "react";

import { Box, Button, Typography, Modal } from "@mui/material";

import AddForm from "./AddForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  padding: 4,
  paddingTop: 1,
};

const AddTodo = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewTodo = (newTodo) => {
    handleClose();

    return props.onAddedItem(newTodo);
  };

  return (
    <Box>
      <Button
        sx={{ margin: "10px" }}
        onClick={handleOpen}
        variant="contained"
        size="medium"
      >
        + New Todo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            sx={{ m: 2 }}
          >
            Add a New Todo
          </Typography>
          <AddForm onNewTodo={addNewTodo} />
        </Box>
      </Modal>
    </Box>
  );
};

export default AddTodo;
