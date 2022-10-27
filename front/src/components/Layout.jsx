import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";
import { Header } from "./Header";

const WaitForAuth = ({ children }) => {
  const { authenticated } = useAuthContext();

  if (authenticated === undefined) {
    return <></>;
  }

  return children;
};

export default function Layout() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.appBody",
          minHeight: "100vh",
        }}
      >
        <WaitForAuth>
          <Header />
          <main>
            <Outlet />
          </main>
        </WaitForAuth>
      </Box>
    </>
  );
}
