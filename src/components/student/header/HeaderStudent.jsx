import { Button, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HeaderTypography from "../common/HeaderTypography";
import SkillMenu from "./SkillMenu";
import { useState, useEffect } from "react";

function HeaderStudent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
        setIsLoggedIn(false);
        handleMenuClose();
        navigate('/student/account'); // Điều hướng về trang đăng nhập
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

                {isLoggedIn ? (
                    <>
                        <IconButton onClick={handleMenuClick}>
                            <img src="/header_user.png" alt="User Icon" style={{ width: '40px' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleMenuClose}>Study Schedule</MenuItem>
                            <MenuItem onClick={handleMenuClose}>History Test</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Button color="header" component={Link} to="/student/account">
                        <HeaderTypography>Sign in</HeaderTypography>
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}

export default HeaderStudent;
