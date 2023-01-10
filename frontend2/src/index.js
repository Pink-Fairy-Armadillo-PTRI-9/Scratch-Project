import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
import { TasksContextProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <TasksContextProvider>
    <App />
  </TasksContextProvider>
  </React.StrictMode>
);