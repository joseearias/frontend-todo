import React, { useContext, useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EditForm from "./EditForm";
import TodoCheckbox from "./TodoCheckbox";
import TodoContext from "../../store/todo-context";

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

const Todos = () => {
  const [open, setOpen] = useState(false);
  const [currTodo, setCurrTodo] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const todoCtx = useContext(TodoContext);

  const columns = [
    {
      field: "state",
      headerName: "Done",
      headerClassName: "app-theme--header",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 57,
      flex: 1,
      renderCell: (params) => {
        return (
          <TodoCheckbox
            onChecked={todoCtx.onDoneItem}
            onUnchecked={todoCtx.onUndoneItem}
            todoId={params.id}
            checked={params.row.state}
          ></TodoCheckbox>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "app-theme--header",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: "priority",
      headerName: "Priority",
      headerClassName: "app-theme--header",
      disableColumnMenu: true,
      width: 90,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      headerClassName: "app-theme--header",
      disableColumnMenu: true,
      width: 95,
      valueFormatter: (params) => {
        if (params.value === null) {
          return "";
        }
        return params.value.substring(0, 10);
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "app-theme--header",
      width: 50,
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => {
        const clickHandler = () => {
          handleOpen();
          setCurrTodo(params.row);
        };

        return (
          <>
            <IconButton aria-label="edit" onClick={clickHandler}>
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "app-theme--header",
      width: 65,
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => {
        const clickHandler = () => {
          todoCtx.onDeletedItem(params.row.id);
        };

        return (
          <IconButton aria-label="edit" onClick={clickHandler}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .app-theme--header": {
          backgroundColor: "#485bc3",
          color: "white",
        },
      }}
    >
      <DataGrid
        rows={todoCtx.todos}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
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
            Edit Todo
          </Typography>
          <EditForm
            todo={currTodo}
            onUpdatedItem={todoCtx.onUpdatedItem}
            onSave={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Todos;
