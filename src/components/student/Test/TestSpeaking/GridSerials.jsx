import React from 'react';
import { Typography, Grid, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '1rem',
  boxShadow: theme.shadows[3],
}));

const GridItem = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: color === 'red' ? '#f44336' : color === 'green' ? '#4caf50' : 'white',
  border: '1px solid #000',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: color === 'red' ? '#ff7961' : color === 'green' ? '#81c784' : '#f0f0f0',
  },
}));

const getStatusColor = (status) => {
  if (status === 'FAILED') return 'red';
  if (status === 'PASSED') return 'green';
  return 'white';
};

const ScoreGrid = ({ score, gridData = [], serials = [], onItemClick, onClickTestAgain, status, handleBtnSubmit }) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant={status === 'Testing' ? 'h6' : 'h5'} gutterBottom>
        {status === 'Testing' ? 'Time remaining: 60:00' : `Score: ${score}`}
      </Typography>

      <Grid container spacing={1} sx={{ marginBottom: 2,marginTop:'1rem' }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              <GridItem
                color={getStatusColor(gridData.find((q) => q.serial === item)?.status)}
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
    </StyledPaper>
  );
};
ScoreGrid.propTypes = {
  score: PropTypes.number.isRequired,
  gridData: PropTypes.array.isRequired,
  serials: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onClickTestAgain: PropTypes.func.isRequired,
  handleBtnSubmit: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ScoreGrid;
