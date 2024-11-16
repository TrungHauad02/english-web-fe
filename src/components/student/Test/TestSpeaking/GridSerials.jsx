import React from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';

const StyledBox = styled(Box)({
  padding: '16px',
  textAlign: 'center',
  borderRadius: '1rem',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
});

const GridItem = styled(Box)(({ hasAudio }) => ({
  padding: '8px',
  textAlign: 'center',
  color: '#757575',
  backgroundColor: hasAudio ? '#4caf50' : 'white', // Xanh nếu có audio, trắng nếu không
  border: '1px solid #000',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: hasAudio ? '#81c784' : '#f0f0f0', // Màu xanh nhạt khi hover nếu có audio
  },
}));

const ScoreGrid = ({ score, gridData = [], serials = [], serialSet = {}, onItemClick, onClickTestAgain, status, handleBtnSubmit }) => {
  return (
    <StyledBox>
      <Typography variant={status === 'Testing' ? 'h6' : 'h5'} gutterBottom>
        {status === 'Testing' ? 'Time remaining: 60:00' : `Score: ${score}`}
      </Typography>

      <Grid container spacing={1} sx={{ marginBottom: 2, marginTop: '1rem' }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <GridItem
                hasAudio={serialSet.has(item)} // Sửa dấu `;` thành `=`
                onClick={() => onItemClick(item)}
              >
                <Typography variant="body2">{item}</Typography>
              </GridItem>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2">No data available</Typography>
          </Grid>
        )}
      </Grid>

      <Button
        sx={{
          borderRadius: '1rem',
          backgroundColor: status === 'Testing' ? '#FFD984' : '#4A90E2',
          color: 'black',
          padding: '1rem 2rem',
        }}
        onClick={status === 'Testing' ? handleBtnSubmit : onClickTestAgain}
      >
        {status === 'Testing' ? 'SUBMIT' : 'TEST AGAIN'}
      </Button>
    </StyledBox>
  );
};

export default ScoreGrid;
