import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl   } from '@mui/material';



function ListQuestion(){
  return (

<FormControl component="fieldset" >
{[1, 2, 3].map((questionNumber) => (
  <Box key={questionNumber} sx={{ mb: 3  ,marginTop:'2%'}}>
 <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <Box
    sx={{
      padding:'0.5rem 1rem',
      borderRadius: '50%',
      backgroundColor: '#ACCD0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontWeight: '500'
    }}
  >
    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
      {questionNumber}
    </Typography>
  </Box>
  <Typography variant="body1" gutterBottom sx={{ ml: 1 }}>
    What types of resources are included in the lessons mentioned?
  </Typography>
</Box>
    <RadioGroup sx={{marginLeft:'1.5rem'}}>
      <FormControlLabel value="A" control={<Radio />} label="A. Readings and quizzes" />
      <FormControlLabel value="B" control={<Radio />} label="B. Videos and interviews" />
      <FormControlLabel value="C" control={<Radio />} label="C. Group projects and exams" />
      <FormControlLabel value="D" control={<Radio />} label="D. Lab experiments and presentations" />
    </RadioGroup>
  </Box>
))}
</FormControl>


  );


}
export default ListQuestion;
