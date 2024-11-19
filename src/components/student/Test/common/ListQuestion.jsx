import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl ,Button } from '@mui/material';
import { useEffect, useState,useRef } from 'react';


function ListQuestion({dataTest,focusId,answers,setAnswers}){

    const [selectedAnswers, setSelectedAnswers] = useState(answers || {});
    const questionRefs = useRef({}); 
    const [isFocused, setIsFocused] = useState({});

  const handleAnswerChange = (questionId, answer) => {
    
    const updatedAnswers = { ...selectedAnswers, [questionId]: answer };
    setSelectedAnswers(updatedAnswers);
    setAnswers(updatedAnswers)
    
    
  };


  useEffect(() => {
    setSelectedAnswers(answers);

  }, [answers]);

    useEffect(() => {
        if (focusId && questionRefs.current[focusId]) {
            questionRefs.current[focusId].focus();
            setIsFocused((prev) => ({ ...prev, [focusId]: true }));
            setTimeout(() => {
                questionRefs.current[focusId].blur(); 
                setIsFocused((prev) => ({ ...prev, [focusId]: false })); 
            }, 500);
        }
    }, [focusId]);
 
    return(

<FormControl component="fieldset">
{dataTest.questions.map((questionNumber) => (
  <Box key={questionNumber.id} sx={{ mb: 3, marginTop: '2%' }}
  ref={(el) => questionRefs.current[questionNumber.serial] = el} 
  tabIndex="0"

  >
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
      onChange={(e) => handleAnswerChange(questionNumber.id, e.target.value)

      }
 
    >
      {questionNumber.answers.map((answer) => {
        const isCorrect = answer.isCorrect; 
        const isSelected = selectedAnswers[questionNumber.id] === answer.id;

        return (
          <FormControlLabel
            key={answer.id}
            value={answer.id}
            control={<Radio />}
            label={`${answer.content}`}
            sx={{
       
              fontWeight: isSelected ? 'bold' : 'normal', 
            }}
        
          />
        );
      })}
    </RadioGroup>
  </Box>
))}
</FormControl>

    );
}
export default ListQuestion;