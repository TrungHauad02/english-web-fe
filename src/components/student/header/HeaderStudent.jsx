import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderTypography from "../common/HeaderTypography";
import SkillMenu from "./SkillMenu";

function HeaderStudent(){
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
                <HeaderTypography 
                    variant="h4" 
                    component="h1" 
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem'
                    }}>
                    English Web</HeaderTypography >
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Button
                    color="header"
                    href="/student">
                    <HeaderTypography>Home</HeaderTypography >
                </Button>
                <Button
                    color="header"
                    component={Link} to="/student/list-topic">
                    <HeaderTypography>Vocabulary</HeaderTypography >
                </Button>
                <Button
                    color="header"
                    component={Link} to="/student/grammar">
                    <HeaderTypography>Grammar</HeaderTypography >
                </Button>

                <SkillMenu/>

                <Button
                    color="header">
                    <HeaderTypography>Sign in</HeaderTypography >
                </Button>
                <Button 
                    color="header">
                    <HeaderTypography>Sign up</HeaderTypography >
                </Button>
            </Stack>
        </Stack>
    )
}

export default HeaderStudent;