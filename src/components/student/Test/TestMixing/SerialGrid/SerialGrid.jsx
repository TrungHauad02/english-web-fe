import React from 'react';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/system';
import ItemSerialTest from './ItemSerialTest';
import CountdownTimer from '../../common/CountdownTimer';
const StyledBox = styled(Box)({
  padding: '24px',
  textAlign: 'center',
  justifyContent: 'center',
  borderRadius: '1rem',
  backgroundColor: 'white',
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
});

function SerialGrid({
  gridData = [],
  TitleAndSerials,
  onItemClick,
  handlebtnSubmit,
  duration,
  storeName
}) {
  return (
    <StyledBox>
       <Box>
          <Typography align="center">
            <strong>Time remaining:</strong>
            <br />
            <CountdownTimer
      duration={duration}
      handleSubmit={handlebtnSubmit}
      dbName={"MyDatabase"}
      storeName={storeName}
    />
          </Typography>
        </Box>

      <Divider sx={{ my: 2 }} />

      {TitleAndSerials.title.map((title, index) => (
        <React.Fragment key={index}>
          <ItemSerialTest
            gridData={gridData}
            serials={TitleAndSerials.serials[index]}
            title={title}
            onItemClick={onItemClick}
          />
          <Divider sx={{ my: 2 }} />
        </React.Fragment>
      ))}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem',
        }}
      >
        <Button
          sx={{
            borderRadius: '1rem',
            backgroundColor: '#00796B',
            color: 'white',
            padding: '1rem 2rem',
          }}
          onClick={handlebtnSubmit}
        >
        SUBMIT
        </Button>
      </Box>
    </StyledBox>
  );
}

export default SerialGrid;
