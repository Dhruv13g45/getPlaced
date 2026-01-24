import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            {/* Sidebar */}
            <Box sx={{ width: { xs: '0%', md: '20%' }, flexShrink: 0 }}>
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            </Box>

            {/* Header + Main */}
            <Box
                sx={{
                    width: { xs: '100%', md: '80%' },
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Header handleDrawerToggle={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        pt: { xs: 10, md: 4 },

                        /* 🔥 SCROLL FIX */
                        overflowY: "auto",
                        height: "calc(100vh - 64px)", // header height
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
