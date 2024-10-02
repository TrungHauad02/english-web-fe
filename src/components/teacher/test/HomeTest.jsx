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
  const [filterType, setFilterType] = useState('Mixed'); // Trạng thái mặc định cho bộ lọc
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

  // Hàm lọc bài kiểm tra
  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'Mixed' || test.type === filterType)
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        TEST MANAGEMENT
      </Typography>
      
      <SearchContainer>
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
        />
        <ColorButton color="#FFD700" variant="contained" sx={{ marginLeft: 2 }}>
          Add new test
        </ColorButton>
      </SearchContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test.serial}>
                <TableCell>{test.serial}</TableCell>
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.status}</TableCell>
                <TableCell>
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
