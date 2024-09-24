import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
const MainTitleContainer = styled(Box)(({ theme }) => ({
    width: '25%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    textAlign: 'center',
    color: 'black',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 100%)',
    borderRadius: '0 20px 0 0',
  }));
  const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: 'auto',
  }));
  const Title = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(to right, rgba(172, 205, 10, 1) 0%, rgba(232, 245, 168, 1) 100%)',
    textAlign: 'center',
    width: '15%',
    padding: theme.spacing(2),
    fontSize: '24px',
    marginTop: '5%',
    marginLeft: '2%',
    borderRadius: '40px',
  }));
  function MainTitle({title,bg}){
    return(
      <>
          <ImageContainer>
        <img src={bg} alt="Test" style={{ width: '100%', height: 'auto' }} />
        <MainTitleContainer>
          <Typography variant="h4" component="h1" sx={{ margin: 2 }}>
            TEST ONLINE
          </Typography>
        </MainTitleContainer>
      </ImageContainer>
           <Title elevation={3}>{title}</Title>
      </>

      );

  }
  export default MainTitle;