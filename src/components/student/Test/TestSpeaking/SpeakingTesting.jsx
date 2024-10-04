import { Box, Typography, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useState } from 'react';

export default function InterviewInstruction({data}) {
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
  
//   const getListSerials = () => {
//     const serials: [];
//     data.questions.forEach(question => {
//         question.serial
//     }
//   };

  return (
    <Box sx={{marginLeft:'5%',marginRight:'5%'}}>
      <Box sx={{
        backgroundColor: '#7e787854',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:'1rem',
        textAlign:'center'
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', }}>
         {data.title}
        </Typography>
    
   
            <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#e74c3c',
            '&:hover': {
              backgroundColor: '#c0392b'
            }
          }}
          endIcon={<PlayArrowIcon />}
          onClick={handlebtnStart}
        >
            {
                         isStart===false ? "Start now" : " Next Question "
            }
     
        </Button>
        
        
      </Box>
      <Box  sx={{
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '0 auto',
      padding:'5%',
      marginBottom:'5%'
    }}> 
        <Typography variant="h4" sx={{ fontWeight: 'bold',color:'red',marginBottom:'1rem' }}>
       {
            isStart === false ? data.title : ( 
                "Question" +
                data.questions[indexquestion].serial
             )
  
        }
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      {
            isStart === false ? data.description : ( 
               
                data.questions[indexquestion].content
              
             )
  
        }
      </Typography>
      {

      }

      </Box>
      
    </Box>
  );
}