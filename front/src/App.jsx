import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import QualifyTeacher from "./views/QualifyTeacher";
import School from "./views/School";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/auth-context";
import { TeacherProfile } from "./components/TeacherProfile";
import { CssVarsProvider } from "@mui/joy/styles";
import { StyledEngineProvider } from "@mui/joy/styles";
import theme from "./theme";
import { GlobalStyles } from "@mui/joy";
import { useMediaQuery } from "@mui/material";

const App = () => {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider
          theme={theme}
          defaultMode={darkMode ? "dark" : "light"}
        >
          <GlobalStyles
            styles={(theme) => ({
              body: {
                margin: 0,
                fontFamily: theme.vars.fontFamily.body,
              },
            })}
          />
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/teachers" element={<Home />} />
                <Route path="/teacher/:id" element={<TeacherProfile />} />
                <Route path="/universities" element={<Home />} />
                <Route path="/qualify" element={<QualifyTeacher />} />
                <Route path="/school" element={<School />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
