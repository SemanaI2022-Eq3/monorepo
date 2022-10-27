import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CssVarsProvider } from "@mui/joy/styles";
import axios from "axios";
import { StyledEngineProvider } from "@mui/joy/styles";
import theme from "./theme";
import { GlobalStyles } from "@mui/joy";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider theme={theme}>
          <GlobalStyles
            styles={(theme) => ({
              body: {
                margin: 0,
                fontFamily: theme.vars.fontFamily.body,
              },
            })}
          />
          <App />
        </CssVarsProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
