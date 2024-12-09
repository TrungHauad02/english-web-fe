import React from 'react';
import { Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '1rem',
}));

const GridItem = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: color === 'red' ? '#fff' : color === 'green' ? '#fff' : '#000', 
  backgroundColor: color === 'red' ? '#f44336' : color === 'green' ? '#4caf50' : 'white',
  border: '1px solid #000',
  transition: 'background-color 0.3s ease', 
  cursor: 'pointer', 
  '&:hover': {
    backgroundColor: color === 'red' ? '#ff7961' : color === 'green' ? '#81c784' : '#f0f0f0',
  },
}));

const ScoreGrid = ({ score, gridData = [], serials = [], onItemClick, handleTestAgain }) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h5" gutterBottom>
        Score: {score}
      </Typography>
      
      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} key={index}>
              <GridItem
                color={
                  gridData[serials[index] - 1] === 1
                    ? 'green'
                    : 'red'
                }
                onClick={() => onItemClick(serials[index])}
              >
                <Typography variant="body2">{serials[index]}</Typography>
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
        variant="contained" 
        sx={{ 
          backgroundColor: '#00796B', 
          color: 'white',
          '&:hover': {
            backgroundColor: '#00796B',
          },
          borderRadius: '0.5rem',
        }}
        onClick={handleTestAgain}
      >
        TEST AGAIN
      </Button>
    </StyledPaper>
  );
};

export default ScoreGrid;
