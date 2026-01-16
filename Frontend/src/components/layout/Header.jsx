import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Avatar,
    Box,
    Typography,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';

const Header = ({ handleDrawerToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: '#ffffff',
                color: '#1f2937',
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
                width: { xs: '100%', md: '80%' },
                ml: { md: '20%' },
            }}
        >
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: '#4f46e5',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1,
                            }}
                        >
                            <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>G</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                            GetPlaced
                        </Typography>
                    </Box>
                )}

                {!isMobile && <Box sx={{ flexGrow: 1 }} />}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    <IconButton onClick={handleMenu}>
                        <Avatar sx={{ width: 36, height: 36, backgroundColor: '#e0e7ff', color: '#4f46e5', fontWeight: 'bold' }}>R</Avatar>
                    </IconButton>

                    {!isMobile && <Typography sx={{ ml: 1, fontWeight: 500, color: '#374151' }}>Rahul S.</Typography>}
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{ sx: { mt: 1.5, minWidth: 200 } }}
                >
                    <MenuItem onClick={handleClose}><AccountCircle sx={{ mr: 2 }} />Profile</MenuItem>
                    <MenuItem onClick={handleClose}><SettingsIcon sx={{ mr: 2 }} />Settings</MenuItem>
                    <MenuItem onClick={handleClose}><LogoutIcon sx={{ mr: 2 }} />Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
