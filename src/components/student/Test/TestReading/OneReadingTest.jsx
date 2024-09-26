import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
import { useEffect, useState } from 'react';


function OneReadingTest({onereading,status}){
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const TestContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    background: '#d9d9d938',
  
  }));
  
  
  
  const Partition = styled(Box)(({ theme }) => ({
    width: '0.5%',
    margin: '0 0.25%',
    background: '#D9D9D9',
  
  }));
  
  const QuestionSection = styled(Grid)(({ theme }) => ({
    marginRight: '2%',
    flex: '0 1 47%',
  }));
  


  useEffect(() => {
    if (status === "Testing") {
      localStorage.removeItem('selectedAnswers'); // Xóa localStorage khi trạng thái là "Testing"
      setSelectedAnswers({}); 
    }
  }, [status]);
  
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};
    setSelectedAnswers(storedAnswers);
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    const updatedAnswers = { ...selectedAnswers, [questionId]: answer };
    setSelectedAnswers(updatedAnswers);
    localStorage.setItem('selectedAnswers', JSON.stringify(updatedAnswers));
  };
  return (
    <>
    <TestContainer sx={{ flex: '1 1 49%'  }}>
    <QuestionSection item >
      <Typography variant="body1" sx={{marginTop:'2%'}}>
        These lessons include readings, vocab, quizzes and comprehension questions, as well as topics for discussion and essays. If you care about our Earth, but find it hard to express your opinions and concerns in English, these pages will help you...
      </Typography>
    </QuestionSection>
  </TestContainer>
  <Partition sx={{ flex: '1 1 0.2%' }}  />
  <TestContainer sx={{ flex: '1 1 49%'}}>
    <Box sx={{ border: '1px solid black',
  borderRadius: '1rem',padding: '0.5rem',margin:'0.5rem' }} >
     <FormControl component="fieldset">
    {onereading.questions.map((questionNumber) => (
      <Box key={questionNumber.id} sx={{ mb: 3, marginTop: '2%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '50%',
              backgroundColor: '#ACCD0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: '500',
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {questionNumber.serial}
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom sx={{ ml: 1 }}>
            {questionNumber.content}
          </Typography>
        </Box>
        <RadioGroup
          sx={{ marginLeft: '1.5rem' }}
          value={selectedAnswers[questionNumber.id] || ''}
          onChange={(e) => status !== 'Submit' && handleAnswerChange(questionNumber.id, e.target.value)}
          
        >
          {questionNumber.options.map((option) => {
            const isCorrect = option.isCorrect; // Giả định bạn có thuộc tính này trong option
            const isSelected = selectedAnswers[questionNumber.id] === option.content;

            return (
              <FormControlLabel
                key={option.id}
                value={option.content}
                control={<Radio />}
                label={`${option.id}. ${option.content}`}
                sx={{
                  color: status === 'Submit' 
                    ? (isSelected ? (isCorrect ? 'green' : 'red') : (isCorrect ? 'green' : 'inherit')) 
                    : 'inherit', 
                  fontWeight: isSelected ? 'bold' : 'normal', 
                }}
            
              />
            );
          })}
        </RadioGroup>
      </Box>
    ))}
  </FormControl>
  
    </Box>
    <Button sx={{border: '0.0001rem solid black',
  borderRadius: '1rem',background:'#FFD984',color:'black',float:'right',marginRight:'10%',marginBottom:'2%',padding:'1rem 2rem'}}>
       SUBMIT
      </Button>
  </TestContainer>
  </>
  
  );


}
export default OneReadingTest;
