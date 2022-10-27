import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export default function Layout() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.appBody",
          minHeight: "100vh",
        }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </Box>
    </>
  );
}
