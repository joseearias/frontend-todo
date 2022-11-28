import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { TodoContextProvider } from "./store/todo-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
);
