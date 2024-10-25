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
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { getListTest } from "../../../api/student/test/listTestApi"
import { getListTestByType } from "../../../api/student/test/listTestApi"
import CustomPagination from "../../common/pagination/CustomPagination";
import { useLocation, useNavigate } from 'react-router-dom';



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
  const type = {
    mixing: 'MIXING',
    reading: 'READING',
    listening: 'LISTENING',
    speaking: 'SPEAKING',
    writing: 'WRITING',
  
};
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [alltest, setalltest] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currtype, setCurrtype] = useState(type.mixing);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setCurrtype(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListTest(page,currtype);
      const tests = data.content;
      setalltest(await getListTestByType(currtype));
      console.log(tests);
      setTotalPage(data.totalPages);
      
      if (tests) {
        setList(tests);
        
      } else {
        setList([]);
   
      }
    };

    fetchData();
  }, [page,currtype]);
  
  useEffect(() => {
    const filtered = alltest.filter(test => 
      test.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, alltest]);
  const onChangePage = (event, value) => {
    setPage(value);
    setSearchTerm('');
  };
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlebtnDetail = (datatest) => {

    const currentPath = location.pathname; 
    let newPath = '';

    switch (datatest.type) {
        case type.mixing:
            newPath = `${currentPath}mixing`; 
            break;
        case type.reading:
            newPath = `${currentPath}reading`; 
            break;
        case type.listening:
            newPath = `${currentPath}listening`; 
            break;
        case type.speaking:
            newPath = `${currentPath}speaking`; 
            break;
        case type.writing:
            newPath = `${currentPath}writing`; 
            break;
        default:
            break;
    }
    navigate(newPath, { state: datatest });
};
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
      value={currtype}
      onChange={handleFilterChange}
      variant="outlined"
      sx={{ minWidth: 120 }}
    >
      <MenuItem value={type.mixing}>Mixing</MenuItem>
      <MenuItem value={type.reading}>Reading</MenuItem>
      <MenuItem value={type.listening}>Listening</MenuItem>
      <MenuItem value={type.speaking}>Speaking</MenuItem>
      <MenuItem value={type.writing}>Writing</MenuItem>
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
          <TableCell align="center">Details</TableCell> 
        </TableRow>
      </TableHead>
      <TableBody>
        {(searchTerm === '' ? list : filteredList).map((test) => (
          <TableRow key={test.serial}>
            <TableCell>{test.serial}</TableCell>
            <TableCell>{test.title}</TableCell>
            <TableCell>{test.status}</TableCell>
            <TableCell align="center">
              <Button variant="outlined" onClick={() => handlebtnDetail(test)}>Detail</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
          <CustomPagination count={totalPage} onChange={onChangePage} key={currtype} />
        </Stack>
</Container>

  );
};
export default TestManagement;
