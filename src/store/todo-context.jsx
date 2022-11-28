import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoContext = React.createContext({
  todos: [],
  onAddedItem: () => {},
  onUpdatedItem: () => {},
  onDoneItem: () => {},
  onUndoneItem: () => {},
  onDeletedItem: () => {},
  onSearch: () => {},
});

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filter, setFilter] = useState({
    filterName: "",
    filterPriority: "All",
    filterState: "All",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addItemHandler = (newTodo) => {
    axios.post("http://localhost:8080/api/todos", newTodo).then((response) => {
      setTodos(todos.concat(response.data));
    });
    setTodos(todos.concat(newTodo));
  };

  const deleteItemHandler = (todoId) => {
    axios.delete(`http://localhost:8080/api/todos/${todoId}`);

    setTodos((prevtodos) => {
      const updatedtodos = prevtodos.filter((todo) => todo.id !== todoId);
      return updatedtodos;
    });
  };

  const updateItemHandler = (updatedTodo) => {
    console.log(updatedTodo);

    axios
      .put(`http://localhost:8080/api/todos/${updatedTodo.id}`, updatedTodo)
      .then((response) => {
        console.log(response.data);
        setTodos(
          todos.map((n) => (n.id !== response.data.id ? n : response.data))
        );
      });
  };

  // Sets the state of the filter
  const searchItemsHandler = (searchObj) => {
    if (searchObj.searchState === "Done") {
      searchObj.searchState = true;
    } else if (searchObj.searchState === "Undone") {
      searchObj.searchState = false;
    }

    setFilter({
      filterName: searchObj.searchName,
      filterPriority: searchObj.searchPriority,
      filterState: searchObj.searchState,
    });
  };

  // Filters according to the values entered on the Search form
  useEffect(() => {
    if (filter.filterPriority === "All" && filter.filterState === "All") {
      setFilteredTodos(todos.filter((t) => t.name.includes(filter.filterName)));
    } else if (filter.filterPriority != "All" && filter.filterState != "All") {
      setFilteredTodos(
        todos.filter(
          (t) =>
            t.priority === filter.filterPriority &&
            t.state === filter.filterState
        )
      );
    } else if (filter.filterPriority === "All") {
      setFilteredTodos(todos.filter((t) => t.state === filter.filterState));
    } else if (filter.filterState === "All") {
      setFilteredTodos(
        todos.filter((t) => t.priority === filter.filterPriority)
      );
    }
  }, [filter, todos]);

  const toggleDoneOf = (id) => {
    const url = `http://localhost:8080/api/todos/${id}/done`;

    axios.put(url).then((response) => {
      setTodos(todos.map((n) => (n.id !== id ? n : response.data)));
    });
  };

  const toggleUndoneOf = (id) => {
    const url = `http://localhost:8080/api/todos/${id}/undone`;

    axios.put(url).then((response) => {
      setTodos(todos.map((n) => (n.id !== id ? n : response.data)));
    });
  };

  return (
    <TodoContext.Provider
      value={{
        allTodos: todos,
        todos: filteredTodos,
        onDeletedItem: deleteItemHandler,
        onUpdatedItem: updateItemHandler,
        onDoneItem: toggleDoneOf,
        onUndoneItem: toggleUndoneOf,
        onAddedItem: addItemHandler,
        onSearch: searchItemsHandler,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
