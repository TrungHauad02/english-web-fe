import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const HelpTextField = ({
  label,
  value,
  onChange,
  error,
  errorText,
  type = 'text',
  disabled = false,
  minWidth = '120px',
  ...props
}) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Box sx={{ mb: error ? '1rem' : 0 }}>
      <Typography
        variant="body1"
        style={{ fontWeight: 'bold', marginRight: '16px', minWidth: minWidth,}} 
      >
        {label}
      </Typography>
      </Box>
     
      <Box flexGrow={1}>
        <TextField
          sx={{  backgroundColor: "white",}}
          value={value}
          onChange={onChange}
          error={error}
          type={type}
          fullWidth
          variant="outlined"
          disabled={disabled}
          {...props}
        />
        {error && (
          <Typography
            variant="caption"
            color="error"
            style={{ height:'1rem', display: 'block' }}
          >
            {errorText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HelpTextField;
