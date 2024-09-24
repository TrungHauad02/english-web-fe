import React, { useState, useEffect } from 'react';
import { Button, Stack, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HeaderTypography from '../common/HeaderTypography';
import SkillMenu from './SkillMenu';
import Profile from './Profile'; // Import Profile component

function HeaderStudent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openProfileDialog, setOpenProfileDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = () => {
            const loggedIn = localStorage.getItem('isSignIn') === 'true';
            setIsLoggedIn(loggedIn);
        };

        checkLoggedIn();
        window.addEventListener('storage', checkLoggedIn);

        return () => {
            window.removeEventListener('storage', checkLoggedIn);
        };
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isSignIn');
        setIsLoggedIn(false);
        handleMenuClose();
        navigate('/student/account');
    };

    const handleProfileOpen = () => {
        setOpenProfileDialog(true);
        handleMenuClose();
    };

    const handleProfileClose = () => {
        setOpenProfileDialog(false);
    };

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
                backgroundColor: '#4A475C',
                color: '#fff',
                padding: '0.5rem',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Stack direction={'row'} alignItems={'center'} spacing={5}>
                <img src="icon.png" alt="icon" style={{ width: '50px', marginLeft: '1rem' }} />
                <HeaderTypography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}>
                    English Web
                </HeaderTypography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Button color="header" href="/student">
                    <HeaderTypography>Home</HeaderTypography>
                </Button>
                {isLoggedIn ? (
                    <>
                        <Button color="header" component={Link} to="/student/list-topic">
                            <HeaderTypography>Vocabulary</HeaderTypography>
                        </Button>
                        <Button color="header" component={Link} to="/student/grammar">
                            <HeaderTypography>Grammar</HeaderTypography>
                        </Button>

                        <SkillMenu />

                        <Button color="header" component={Link} to="/student/test">
                            <HeaderTypography>Test</HeaderTypography>
                        </Button>

                        <IconButton onClick={handleMenuClick}>
                            <img src="/header_user.png" alt="User Icon" style={{ width: '40px' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{
                                "& .MuiMenu-paper": {
                                    background: "#75718D",
                                    padding: ".2rem 1rem",
                                    borderRadius: "1.5rem"
                                }
                            }}
                        >
                            <MenuItem onClick={handleProfileOpen} 
                                sx={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                                    color: 'white'
                                }}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose} 
                                sx={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                                    color: 'white'
                                }}>
                                Study Schedule
                            </MenuItem>
                            <MenuItem 
                                onClick={handleMenuClose} 
                                sx={{
                                    borderBottom: '3px solid #ffff',
                                    color: 'white'
                                }}>
                                History Test
                            </MenuItem>
                            <MenuItem 
                                onClick={handleLogout} 
                                sx={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button color="header" component={Link} to="/student/account">
                        <HeaderTypography>Sign In</HeaderTypography>
                    </Button>
                )}
            </Stack>

            {/* Sử dụng Profile component */}
            <Profile open={openProfileDialog} handleClose={handleProfileClose} />
        </Stack>
    );
}

export default HeaderStudent;
