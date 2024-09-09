import { Stack, Typography } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';

function About() {
  return (
    <Stack direction="row" spacing={2}>
        <Typography 
              variant="h6" 
              sx={{
                fontWeight:'bold',
                fontSize: '1.2rem'
              }}>
                About
        </Typography>
        <FacebookIcon/>
        <InstagramIcon/>
        <MailIcon/>
    </Stack>
  );
}

export default About;