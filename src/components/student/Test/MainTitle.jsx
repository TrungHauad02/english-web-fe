import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainPicture from "../common/listTopic/MainPicture";


  
  
  const Title = styled(Paper)(({ theme }) => ({
  
    background: 'linear-gradient(to right, rgba(0, 121, 107, 1) 0%, rgba(224, 247, 250, 1) 100%)', 
    textAlign: 'center',
    width: '15%',
    padding: theme.spacing(2),
    fontSize: '24px',
    marginTop: '5%',
    marginLeft: '2%',
    borderRadius: '4rem',
  }));
  
  function MainTitle({title,bg}){
    return(
      <>
        <MainPicture
        src={
          bg
        }
        title={"Test Online"}
      />
           <Title elevation={3}>{title}</Title>
      </>

      );

  }
  export default MainTitle;