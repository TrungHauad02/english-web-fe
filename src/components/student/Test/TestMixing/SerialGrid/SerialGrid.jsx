import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ItemSerialTest from './ItemSerialTest';


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    borderRadius: '1rem',
  }));
  

function SerialGrid({ gridData = [], TitleAndSerials, onItemClick }) {
    return (
        <>
            <StyledPaper elevation={3}>
                {TitleAndSerials.title.map((title, index) => (
                    <ItemSerialTest 
                        key={index} 
                        gridData={gridData} 
                        serials={TitleAndSerials.serials[index]} 
                        title={title} 
                        onItemClick={onItemClick}
                    />
                ))}
            </StyledPaper>
        </>
    );
}
export default SerialGrid;
