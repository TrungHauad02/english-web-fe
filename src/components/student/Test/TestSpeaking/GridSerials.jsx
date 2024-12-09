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
  backgroundColor: hasAudio ? '#4caf50' : 'white',
  border: '1px solid #000',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: hasAudio ? '#81c784' : '#f0f0f0',
  },
}));

const ScoreGrid = ({serials = [], serialSet = {}, handleSerialClick, handleBtnSubmit }) => {
  return (
    <StyledBox>
      <Grid container spacing={1} sx={{ marginBottom: 2, marginTop: '1rem' }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <GridItem
                hasAudio={serialSet.has(item)}
                onClick={() => handleSerialClick(item)}
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
          backgroundColor: '#00796B',
          color: 'white',
          padding: '1rem 3rem',
        }}
        onClick={handleBtnSubmit}
      >
        SUBMIT
      </Button>
    </StyledBox>
  );
};

ScoreGrid.propTypes = {
  score: PropTypes.number.isRequired,
  serials: PropTypes.array,
  serialSet: PropTypes.object,
  handleSerialClick: PropTypes.func.isRequired,
  handleBtnSubmit: PropTypes.func.isRequired,
};

export default ScoreGrid;
