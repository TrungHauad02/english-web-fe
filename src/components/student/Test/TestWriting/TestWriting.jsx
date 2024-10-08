import React, {useState, useCallback} from 'react';
import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper, TextField  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest';
import DataTestWriting from './DataTestWriting';
import ContentTestWriting from './ContentTestWriting';

const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));



function TestWriting({list,quote, title, bg}) {
  const [status, setStatus] = useState('Testing');
  const [indexVisible, setIndexVisible] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); 
  const [renderKey, setRenderKey] = useState(0);


  const handlebtnSubmit = () => {
    setStatus('Submit');
    const savedAnswers = localStorage.getItem('selectedAnswers'+title);

    if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
    }
  };
  const onClickTestAgain = () => {
    localStorage.removeItem('selectedAnswers' + title);
    setSelectedAnswers([]);
    setStatus('Testing');

    setRenderKey(renderKey + 1);
};
const calculateScore = () => {
return 0;
};


  return (
    <Box >
     <MainTitle title="Writing" bg={bg} />
      <DurationContainer elevation={1}>
        <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
      </DurationContainer>

      <BtnPreviousNextContentTest indexVisible = {indexVisible}  setIndexVisible={setIndexVisible} sumcontent = {DataTestWriting.datacontent.length}  />
      <ContentTestWriting datatest={DataTestWriting.datacontent[indexVisible]} handlebtnSubmit={handlebtnSubmit} onClickTestAgain= {onClickTestAgain} status={status} calculateScore={calculateScore}/>

    </Box>
  );
}

export default TestWriting;