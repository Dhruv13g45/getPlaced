import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const HEADER_HEIGHT = 64; // 👈 adjust if needed (56 / 64)

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',      // 🔥 fixed viewport height
        backgroundColor: '#f9fafb',
        overflow: 'hidden',   // 🔒 lock body scroll
      }}
    >
      {/* Sidebar */}
      <Box sx={{ width: { xs: 0, md: '20%' }, flexShrink: 0 }}>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ height: HEADER_HEIGHT }}>
          <Header handleDrawerToggle={handleDrawerToggle} />
        </Box>

        {/* 🔥 SCROLLABLE CONTENT */}
        <Box
          component="main"
          sx={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            overflowY: 'auto',
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
