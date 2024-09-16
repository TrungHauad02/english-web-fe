import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '16px',
}));

const GridItem = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: color === 'red' ? '#f44336' : color === 'green' ? '#4caf50' : 'white',
  border: '1px solid #000',
}));

const ScoreGrid = ({ score, gridData }) => {
  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom>
        Score: {score}
      </Typography>
      
      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
        {gridData.map((item, index) => (
          <Grid item xs={2} key={index}>
            <GridItem color={item === 0 ? 'red' : item === 1 ? 'green' : 'white'}>
              <Typography variant="body2">{item}</Typography>
            </GridItem>
          </Grid>
        ))}
      </Grid>
      
      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#ffd54f', 
          color: 'black',
          '&:hover': {
            backgroundColor: '#ffca28',
          },
        }}
      >
        TEST AGAIN
      </Button>
    </StyledPaper>
  );
};

export default ScoreGrid;