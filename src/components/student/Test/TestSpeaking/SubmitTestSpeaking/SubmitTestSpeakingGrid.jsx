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
const GridItem = styled(Box)(({ isAudioContent }) => ({
  padding: '8px',
  textAlign: 'center',
  color: '#ffffff',
  backgroundColor: isAudioContent ? '#4caf50' : '#f44336', 
  border: '1px solid #000',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: isAudioContent ? '#81c784' : '#e57373',
  },
}));

const SubmitTestSpeakingGrid = ({ score, serials = [], submitResults = {}, handleSerialClick, onClickTestAgain }) => {
  return (
    <StyledBox>
      <Typography variant="h6" gutterBottom>
       Score: {score}
      </Typography>

      <Grid container spacing={1} sx={{ marginBottom: 2, marginTop: '1rem' }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <GridItem
                isAudioContent={submitResults[item]?.isAudioContent} 
                onClick={() => handleSerialClick(item)}
              >
                <Typography variant="body2">
                  {item} 
                </Typography>
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
          backgroundColor: '#4A90E2',
          color: 'white',
          padding: '1rem 2rem',
          marginTop: '1rem',
        }}
        onClick={onClickTestAgain}
      >
        TEST AGAIN
      </Button>
    </StyledBox>
  );
};

SubmitTestSpeakingGrid.propTypes = {
  score: PropTypes.number.isRequired,
  serials: PropTypes.array,
  submitResults: PropTypes.object.isRequired, 
  handleSerialClick: PropTypes.func.isRequired,
  onClickTestAgain: PropTypes.func.isRequired,
};

export default SubmitTestSpeakingGrid;
