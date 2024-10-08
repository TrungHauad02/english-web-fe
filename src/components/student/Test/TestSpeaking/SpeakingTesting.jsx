import { Box, Typography, Button ,IconButton,Paper} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from 'react';
import GridSerials from './GridSerials';
import MicIcon from '@mui/icons-material/Mic';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
}));
export default function InterviewInstruction({data,status}) {
  const [isStart, setisStart] = useState(false);
  const [indexquestion,setindexquestion] = useState(0);
  

  const handlebtnStart = () => {
    if(isStart===false)
    {
        setisStart(!isStart);
    }
    else{

        setindexquestion(indexquestion+1)
    }
  };
  
  const getListSerials = () => {
    const serials= [];
    data.questions.forEach(question => {
        serials.push(question.serial);
    });
    return serials;
  };

  return (
    <Box sx={{marginLeft:'5%',marginRight:'5%',display:'flex',marginBottom:'2rem'}}>
 <Box sx={{ width: '80%', boxShadow: 3, borderRadius: '8px', margin: '0 auto', padding: 0 }}> 
  <Box
    sx={{
      backgroundColor: '#7e787854',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      textAlign: 'center',
 
    }}
  >
    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
      {data.title}
    </Typography>

    <Button
      variant="contained"
      sx={{
        backgroundColor: '#007bff',
        '&:hover': {
          backgroundColor: '#0056b3',
        },
      }}
      endIcon={<PlayArrowIcon />}
      onClick={handlebtnStart}
    >
      {isStart === false ? "Start now" : " Next Question "}
    </Button>
  </Box>

  <Box
    sx={{
      backgroundColor: '#f5f5f5',
      borderRadius: '0 0 8px 8px', 
      textAlign: 'center',
      margin: '0 auto',
      padding: '5%',
      marginBottom: '0', 
    }}
  >
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
      {isStart === false ? data.title : "Question " + data.questions[indexquestion].serial}
    </Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      {isStart === false ? data.description : data.questions[indexquestion].content}
    </Typography>
    {isStart === true ? (
      <IconButton
        sx={{
          borderRadius: '50%',
          padding: '1rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
        }}
      >
        <MicIcon sx={{ color: '#FF5A5A', fontSize: '3rem' }} />
      </IconButton>
    ) : null}
  </Box>
</Box>
      <Box sx={{ width:'20%',marginLeft:'1rem'}}>
      <GridSerials serials={getListSerials()} status={status}/>
      </Box>
    </Box>
  );
}