import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/auth-context";

const App = () => (
  <>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  </>
);

export default App;
