import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssVarsProvider } from "@mui/joy/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
