import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';


const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '1rem',
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

const ScoreGrid = ({ score, gridData = [],serials=[] ,onItemClick,onClickTestAgain,status,handlebtnSubmit}) => { 
  return (
    <StyledPaper elevation={3}>
      {
        status==="Testing" ? 
        <Typography variant="h6" gutterBottom>
          Time remaining: 60:00
      </Typography>
      :
      <Typography variant="h5" gutterBottom>
        Score: {score}
      </Typography>
      }
      
      
      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={4} key={index}>
              <GridItem color={gridData[serials[index]-1] === 0 ? 'red' : gridData[serials[index]-1] === 1 ? 'green' : 'white'}
              onClick={() => onItemClick(serials[index])}
              >
                <Typography variant="body2">{ serials[index]}</Typography>
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
          onClick={status === 'Testing' ? handlebtnSubmit : onClickTestAgain}
        >
          {status === 'Testing' ? 'SUBMIT' : 'TEST AGAIN'}
        </Button>
   
    </StyledPaper>
  );
};

export default ScoreGrid;
