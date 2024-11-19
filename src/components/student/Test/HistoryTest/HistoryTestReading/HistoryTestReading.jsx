import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle from '../../MainTitle';
import HistoryOneReading from './HistoryOneReading';
import React, { useState, useEffect } from 'react';
import BtnPreviousNextContentTest from '../../common/BtnPreviousNextContentTest';
import { useLocation } from 'react-router-dom';
import { getTest } from 'api/test/TestApi';
import { getSubmitTest } from 'api/test/submitTest';
import { useNavigate } from 'react-router-dom';
const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));

function HistoryTestReading() {
  const [indexVisible, setIndexVisible] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResult = await getTest(state.testId);
        const historyTestResult = await getSubmitTest(state.id);

        if (testResult) {
          setTest(testResult);
        }
        if (historyTestResult) {
          setHistoryTest(historyTestResult);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id, state.testId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const score = historyTest?.score;
  const title = test?.type || '';



  const handleTestAgain = () => {

    const state = {
        id: test.id,
    }
    navigate('/student/tests/reading', { state });
  };

  return (
    <Box>
      <MainTitle title="Reading" bg="/bg_test.png" />
      <DurationContainer
  sx={{
    marginRight: '5%',
    textAlign: 'center',
    backgroundColor: '#FFF4CC',
    borderRadius: '12px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #E0C080',
  }}
  elevation={2}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: 500,
      color: '#5A5A5A',
    }}
  >
    {score}
  </Typography>
</DurationContainer>

      <BtnPreviousNextContentTest 
        indexVisible={indexVisible}
        setIndexVisible={setIndexVisible}
        sumcontent={test?.testReadings?.length || 0}
      />
      <Box sx={{ marginRight: '5%', marginLeft: '5%', display: 'flex', marginTop: '2%' }}>
        {test && historyTest ? (
          <HistoryOneReading
            onereading={test.testReadings[indexVisible]}
            title={title}
            dataSubmitTest={historyTest.submitTestReadingAnswers}
            handleTestAgain = {handleTestAgain}
          />
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
    </Box>
  );
}

export default HistoryTestReading;
