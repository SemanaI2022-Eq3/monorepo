import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import QualifyTeacher from "./views/QualifyTeacher";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/auth-context";
import { CssVarsProvider } from "@mui/joy/styles";



const App = () => (
  <>
    <AuthContextProvider>
      <CssVarsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/teachers" element={<Home />} />
            <Route path="/universities" element={<Home />} />
            <Route path="/qualify" element={<QualifyTeacher />}/>
          </Route>
        </Routes>
      </CssVarsProvider>
    </AuthContextProvider>
  </>
);

export default App;
