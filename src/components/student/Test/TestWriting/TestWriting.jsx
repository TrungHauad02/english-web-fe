import React, {useState, useEffect} from 'react';
import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper, TextField  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest';
import { getTest } from 'api/test/TestApi';
import { createSubmitTest } from '../../../../api/test/submitTest';
import { fetchUserInfo } from '../../../../api/user/userService';
import ContentTestWriting from './ContentTestWriting';
import { useLocation ,useNavigate} from 'react-router-dom';

const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));



function TestWriting() {
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setSCore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const title = datatest ? datatest.type : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id);
        console.log(data);
        
        if (data) {
          setdatatest(data);
          console.log(data);
          
        } else {
          setdatatest(null);
        }
      } catch (err) {
        setError('Failed to fetch test data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id]);
 

  const handlebtnSubmit = () => {
   
  };
  const onClickTestAgain = () => {
 
};
const calculateScore = () => {
return 0;


};
  return (
    <Box >
     <MainTitle title="Writing" bg={"/bg_test.png"} />
      <DurationContainer elevation={1}>
        <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
      </DurationContainer>

      <BtnPreviousNextContentTest indexVisible = {indexVisible}  setIndexVisible={setIndexVisible} sumcontent = {datatest?.testWritings.length}  />
      <ContentTestWriting datatest={datatest?.testWritings[indexVisible]} handlebtnSubmit={handlebtnSubmit} onClickTestAgain= {onClickTestAgain} answers ={answers} setAnswers ={setAnswers}/>

    </Box>
  );
}

export default TestWriting;