import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl ,Button } from '@mui/material';
import { useEffect, useState } from 'react';

function OneListeningTest({ onelistening, audioRef, status, onAudioEnd ,onAnswerChange}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});



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

    onAnswerChange(questionId, answer); 
  };
  const [showTranscript, setShowTranscript] = useState(false);
  const handleClick = () => {
    setShowTranscript(!showTranscript); 
  };


  return (
    <>
      {status === 'Testing' 
        ? <audio ref={audioRef} src={onelistening.content} onEnded={onAudioEnd} autoPlay style={{ display: 'none' }} /> 
        : <Box>
            <audio ref={audioRef} src={onelistening.content} controls style={{ width: '100%', marginTop: '1rem' }} />
            <Button
            onClick={handleClick}
            sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', padding: '0.5rem' }}
            variant="text" 
          >
            <Typography variant="body2" sx={{ color: '#49B3D5', marginRight: '0.5rem' }}>
              Show transcript
            </Typography>
            <img src="/icontranscript.png" alt="Transcript Icon" style={{ width: '1rem', height: '1rem' }} />
          </Button>
          {showTranscript && (
        <Typography variant="body2" sx={{ marginTop: '0.5rem', color: '#000' ,padding: '0.5rem' }}>
          Đây là nội dung của transcript!
        </Typography>
      )}
          </Box>
      }
      <FormControl component="fieldset">
        {onelistening.questions.map((questionNumber) => (
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
    </>
  );
}

export default OneListeningTest;
