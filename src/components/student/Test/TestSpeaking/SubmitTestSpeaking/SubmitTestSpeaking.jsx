import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SubmitTestSpeakignContent from './SubmitTestSpeakingContent';
import SubmitTestSpeakingGrid from "./SubmitTestSpeakingGrid";

export default function SubmitTestSpeaking({ datatest, onClickTestAgain , submitTest }) {
  const [selectedSerial, setSelectedSerial] = useState(null);


  const serials = datatest?.testSpeakings?.flatMap((test) => 
    test.questions.map((question) => question.serial)
  ) || [];


  const submitResults = (submitTest?.submitTestSpeakings || []).reduce((acc, item) => {

    const questionWithSerial = datatest?.testSpeakings?.flatMap((test) => test.questions)
      .find((question) => question.id === item.testSpeakingQuestionId);

    if (questionWithSerial) {
      acc[questionWithSerial.serial] = {

        isAudioContent: !!item.content && item.content.includes('firebasestorage'),
        score: item.score,
      };
    }
    return acc;
  }, {});

  
  const handleSerialClick = (serial) => {
    setSelectedSerial(serial);
  };

  return (
    <Grid container spacing={4} sx={{ padding: '2rem' }}>
      <Grid item xs={12} md={9}>
        <SubmitTestSpeakignContent
          submitTestSpeakingList={submitTest?.submitTestSpeakings}
          testSpeakingList={datatest?.testSpeakings}
          focusedSerial={selectedSerial} 
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <SubmitTestSpeakingGrid
          serials={serials}
          handleSerialClick={handleSerialClick}
          submitResults={submitResults} 
          score={0} 
          onClickTestAgain={onClickTestAgain}
        />
      </Grid>
    </Grid>
  );
}
