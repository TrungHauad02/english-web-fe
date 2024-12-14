import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';

const GridItem = styled(Paper)(({ color }) => ({
  width: '100%',
  textAlign: 'center',
  color: color === 'red' ? '#ffffff' : '#000000',
  backgroundColor: color === 'red' ? '#f44336' : color === 'green' ? '#4caf50' : 'white',
  border: '1px solid #000',
  borderRadius: '4px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: color === 'red' ? '#ff7961' : color === 'green' ? '#81c784' : '#f0f0f0',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
  },
}));

const ItemSerialTest = ({ gridData = [], serials = [], onItemClick, title }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {serials.length > 0 ? (
          serials.map((item, index) => (
            <Grid key={index} item xs={2}>
              <GridItem
                color={
                   gridData[item - 1] === -1
                      ? 'red'
                      : 'green'
                }
                onClick={() => onItemClick(serials[index])}
              >
                {serials[index]}
              </GridItem>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ItemSerialTest;
