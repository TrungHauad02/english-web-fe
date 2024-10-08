import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff5e6',
  borderRadius: theme.spacing(2),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: '8px',
  padding: '8px 24px',
  backgroundColor: color,
  color: color === '#98FB98' ? 'black' : 'white',
  '&:hover': {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

const TestManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Mixed');
  const [tests, setTests] = useState([
    { serial: 1, title: 'Test mixd 2024', status: 'Active', type: 'Mixed' },
    { serial: 2, title: 'Test mixd 2024', status: 'Inactive', type: 'Reading' },
    { serial: 3, title: 'Test mixd 2024', status: 'Active', type: 'Listening' },
    { serial: 4, title: 'Test mixd 2024', status: 'Active', type: 'Speaking' },
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'Mixed' || test.type === filterType)
  );

  return (
    <Container maxWidth="lg" sx={{marginTop:'4rem' ,marginBottom:'2rem'}}>

  <Typography 
     
    variant="h4" 
    gutterBottom 
    align="center" 
    sx={{ fontWeight: 'bold', marginBottom: '2rem',}}
  >
    TEST MANAGEMENT
  </Typography>

  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem', 
      gap: '1rem' 
    }}
  >
    <Select
      value={filterType}
      onChange={handleFilterChange}
      variant="outlined"
      sx={{ minWidth: 120 }}
    >
      <MenuItem value="Mixed">Mixed</MenuItem>
      <MenuItem value="Reading">Reading</MenuItem>
      <MenuItem value="Listening">Listening</MenuItem>
      <MenuItem value="Speaking">Speaking</MenuItem>
      <MenuItem value="Writing">Writing</MenuItem>
    </Select>
    
    <TextField
      label="Search Test"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      sx={{ flexGrow: 1 }} 
    />
    
    <ColorButton 
      color="#FFD700" 
      variant="contained" 
      sx={{ marginLeft: 2 ,   whiteSpace: 'nowrap'}}
      
    >
      Add new test
    </ColorButton>
  </Box>
  <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Serial</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Details</TableCell>  {/* Căn giữa cho cột chi tiết */}
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredTests.map((test) => (
          <TableRow key={test.serial}>
            <TableCell>{test.serial}</TableCell>
            <TableCell>{test.title}</TableCell>
            <TableCell>{test.status}</TableCell>
            <TableCell align="center">
              <Button variant="outlined">Detail</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Container>

  );
};

export default TestManagement;
