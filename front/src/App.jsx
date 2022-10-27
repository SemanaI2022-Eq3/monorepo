import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import QualifyTeacher from "./views/QualifyTeacher";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/auth-context";
import { TeacherProfile } from "./components/TeacherProfile";

const App = () => (
  <>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Home />} />
          <Route path="/teacher/:id" element={<TeacherProfile />} />
          <Route path="/universities" element={<Home />} />
          <Route path="/qualify" element={<QualifyTeacher />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  </>
);

export default App;
