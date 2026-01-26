import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const HEADER_HEIGHT = 64;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f9fafb",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box sx={{ width: { xs: 0, md: "20%" }, flexShrink: 0 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ height: HEADER_HEIGHT }}>
          <Header handleDrawerToggle={handleDrawerToggle} />
        </Box>

        {/* Scrollable Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: "auto",
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;