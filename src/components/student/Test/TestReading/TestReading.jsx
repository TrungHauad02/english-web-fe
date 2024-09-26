import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import OneReadingTest from './OneReadingTest';
import DataTestReading from './DataTestReading';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest'



const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));


function TestReading({list,quote, title, bg}) {
  const [status, setStatus] = useState('Testing');
  const [indexVisible, setIndexVisible] = useState(0);
  return (
    <Box >
     <MainTitle title="Reading" bg={bg} />
      <DurationContainer elevation={1}>
        <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
      </DurationContainer>
      <BtnPreviousNextContentTest indexVisible = {indexVisible}  setIndexVisible={setIndexVisible} sumcontent = {DataTestReading.datacontent.length}  />
      <Box sx={{marginRight: '5%', marginLeft: '5%', display: 'flex' , marginTop:'2%'}}>
          <OneReadingTest onereading={DataTestReading.datacontent[indexVisible]}/>
      
</Box>

    </Box>
  );
}

export default TestReading;