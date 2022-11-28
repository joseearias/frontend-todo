import React, { useContext } from "react";

import {
  createTheme,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import Todos from "./components/Todos/Todos";
import Search from "./components/Search/Search";
import Stats from "./components/Stats/Stats";
import TodoContext from "./store/todo-context";
import Footer from "./components/Footer/Footer";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#485bc3",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const App = () => {
  const ctx = useContext(TodoContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Search />
        <AddTodo onAddedItem={ctx.onAddedItem} />
        <Todos
          data={ctx.todos}
          onDeletedItem={ctx.onDeletedItem}
          onUpdatedItem={ctx.onUpdatedItem}
          onDoneItem={ctx.onDoneItem}
          onUndoneItem={ctx.onUndoneItem}
        />
        <Stats />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
