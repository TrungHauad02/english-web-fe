import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import ItemSerialTest from './ItemSerialTest';


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    justifyContent:'center',
    borderRadius: '1rem',
    
  }));
  

function SerialGrid({ gridData = [], TitleAndSerials, onItemClick,status,onClickTestAgain,handlebtnSubmit,score }) {
    return (
        <>
            <StyledPaper elevation={3}>

                
                {
                    status==='Testing' ?
                    <>
                    <Box>
                    <Typography align="center">
                    <strong>Time remaining:</strong>
                    <br />
                    60:00
                    </Typography>
                    <Button sx={{border:'solid',padding:'1rem 4rem'}}
                    onClick={handlebtnSubmit}>
                    SUBMIT
                    </Button>
                    </Box>
                    </>
                    : 
                    <Typography align="center">
                    <strong>SCORE:</strong>
                    <br />
                    {score}
                    </Typography>
                 
                }
                
                {TitleAndSerials.title.map((title, index) => (
                    <ItemSerialTest 
                        key={index} 
                        gridData={gridData} 
                        serials={TitleAndSerials.serials[index]} 
                        title={title} 
                        onItemClick={onItemClick}
                        status ={status}
                    />
                ))}
                    {
                    status==='Submit' && 
                    <Button sx={{border:'solid',padding:'1rem 4rem'}}
                    onClick={onClickTestAgain}>
                    TEST AGAIN
                    </Button>
                }
            </StyledPaper>
        </>
    );
}
export default SerialGrid;
