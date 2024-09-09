import { Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function HeaderStudent(){

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack 
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
                backgroundColor: '#4A475C',
                color: '#fff',
                padding: '0.5rem'
            }}
            >
            <Stack direction={'row'} alignItems={'center'} spacing={5}>
                <img src="icon.png" alt="icon" style={{width: '50px', marginLeft:'1rem'}}/>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}>
                    English Web</Typography >
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Button
                    color="header"
                    href="/student">
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}>
                        Home</Typography >
                </Button>
                <Button
                    color="header"
                    component={Link} to="/student/list-topic">
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}>
                        Vocabulary</Typography >
                </Button>
                <Button
                    color="header"
                    component={Link} to="/student/grammar">
                    <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}>
                    Grammar</Typography >
                </Button>
                <Button
                    id="skill-button"
                    aria-controls={open ? 'skill-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}
                >
                    Skill
                </Button>
                <Menu
                    id="skill-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'skill-button',
                    }}
                >
                    <MenuItem onClick={handleClose} component="a" href="/student/skill/reading">Reading</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="/student/skill/speaking">Speaking</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="/student/skill/writing">Writing</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="/student/skill/listening">Listening</MenuItem>
                </Menu>
                <Button
                    color="header"
                   >
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}>
                        Sign in</Typography >
                </Button>
                <Button 
                    color="header">
                        <Typography 
                    variant="h6" 
                    component="h2" 
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem'
                    }}>
                    Sign up</Typography >
                </Button>
            </Stack>
        </Stack>
    )
}

export default HeaderStudent;