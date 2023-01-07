import React from "react";
// import ReactDOM from "react-dom";
import { render } from 'react-dom';
import App from "./App";
import Navbar from "./src/components/Navbar";
import "./index.css";

// https://github.com/facebook/react/issues/18866
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//     <Navbar />
//   </React.StrictMode>
// );

render(
  // wrap the App in the Provider Component and pass in the store
    <App />, document.getElementById('root')
)
