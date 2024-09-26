import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';




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

const ItemSerialTest = ({ gridData = [],serials=[] ,onItemClick,title}) => { 
  return (
    <>
    <Typography variant="h5" gutterBottom>
      {title}
      </Typography>
      
      <Grid container spacing={1} sx={{ marginBottom: 2 }}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid item xs={2} key={index}>
              <GridItem color={item === 0 ? 'red' : item === 1 ? 'green' : 'white'}
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
    </>

  );
};

export default ItemSerialTest;
