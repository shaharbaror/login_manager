import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { LogProvider } from "./store/login-context";
import { AcountProvider } from "./store/acount-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AcountProvider>
      <LogProvider>
        <App />
      </LogProvider>
    </AcountProvider>
  </BrowserRouter>
);
