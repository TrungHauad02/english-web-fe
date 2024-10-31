import React from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import ItemSerialTest from './ItemSerialTest';

const StyledBox = styled(Box)({
  padding: '24px',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '1rem',
  backgroundColor: 'white',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
});

function SerialGrid({
  gridData = [],
  TitleAndSerials,
  onItemClick,
  status,
  onClickTestAgain,
  handlebtnSubmit,
  score,
}) {
  return (
    <StyledBox>
      {status === 'Testing' ? (
        <Box>
          <Typography align="center">
            <strong>Time remaining:</strong>
            <br />
            60:00
          </Typography>
        </Box>
      ) : (
        <Typography align="center">
          <strong>SCORE:</strong>
          <br />
          {score}
        </Typography>
      )}

      <Divider sx={{ my: 2 }} />

      {TitleAndSerials.title.map((title, index) => (
        <React.Fragment key={index}>
          <ItemSerialTest
            gridData={gridData}
            serials={TitleAndSerials.serials[index]}
            title={title}
            onItemClick={onItemClick}
            status={status}
          />
          <Divider sx={{ my: 2 }} />
        </React.Fragment>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem',
        }}
      >
        <Button
          sx={{
            borderRadius: '1rem',
            backgroundColor: status === 'Testing' ? '#FFD984' : '#4A90E2',
            color: 'black',
            padding: '1rem 2rem',
          }}
          onClick={status === 'Testing' ? handlebtnSubmit : onClickTestAgain}
        >
          {status === 'Testing' ? 'SUBMIT' : 'TEST AGAIN'}
        </Button>
      </Box>
    </StyledBox>
  );
}

export default SerialGrid;
