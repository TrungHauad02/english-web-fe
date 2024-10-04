import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';




const GridItem = styled(Paper)(({ theme, color }) => ({
  width:'100%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: color === 'red' ? '#f44336' : color === 'green' ? '#4caf50' : 'white',
  border: '1px solid #000',
  borderRadius: theme.shape.borderRadius, 
  boxShadow: theme.shadows[2], 
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease', 
  cursor: 'pointer', 
  '&:hover': {
    backgroundColor: color === 'red' ? '#ff7961' : color === 'green' ? '#81c784' : '#f0f0f0',
    boxShadow: theme.shadows[4], 
  },
}));

const GridSerials = ({ gridData = [],serials=[] ,onItemClick,title,status}) => { 
  return (
    <>
    <Box >
    <Typography variant="h5" gutterBottom>
      {title}
      </Typography>
      <Grid container spacing={2} >
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid key={index} item xs={2} >
            <GridItem
            color={status === 'Testing' 
              ? (gridData[item-1] === -1 ? 'white' : 'green') 
              : (gridData[item-1] === -1 ? 'white' : (gridData[item-1] === 0 ? 'red' : 'green'))
            }
    
            
              onClick={() => onItemClick(serials[index])}
            >
              {serials[index]}
            </GridItem>
          </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2">No data available</Typography>
          </Grid>
        )}
      </Grid>
      </Box>
    </>

  );
};

export default GridSerials;
