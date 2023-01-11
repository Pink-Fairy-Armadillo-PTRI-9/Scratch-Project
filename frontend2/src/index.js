import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css'
import { LandlordsContextProvider } from "./context/LandlordsContext";
import { ReviewsContextProvider } from "./context/ReviewContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <LandlordsContextProvider>
  <ReviewsContextProvider>
    <App />
  </ReviewsContextProvider>
  </LandlordsContextProvider>
  </React.StrictMode>
);