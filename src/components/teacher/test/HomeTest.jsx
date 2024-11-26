import React, { useState } from "react";
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
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { getListTest } from "api/test/listTestApi";
import CustomPagination from "shared/component/pagination/CustomPagination";
import { useLocation, useNavigate } from "react-router-dom";
import NewTest from "./NewTest";
const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  backgroundColor: color,
  color: color === "#98FB98" ? "black" : "white",
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

const TestManagement = () => {
  const type = {
    all : "",
    mixing: "MIXING",
    reading: "READING",
    listening: "LISTENING",
    speaking: "SPEAKING",
    writing: "WRITING",
  };
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [alltest, setalltest] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currtype, setCurrtype] = useState(type.mixing);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newTestSerial, setNewTestSerial] = useState(1);
  const [version, setVersion] = useState(1);
  const [versionPage, setVersionPage] = useState(1);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
    setVersion(version+1);
   
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setCurrtype(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListTest(page, currtype,searchTerm);
      const tests = data.content;
      setVersionPage(versionPage+1);
      // const allTestsByType = await getListTestByType(currtype);
      // setalltest(allTestsByType);
      const maxSerial = 100;
      // allTestsByType.reduce((max, test) => Math.max(max, test.serial), 0);
      setNewTestSerial(maxSerial + 1);
      console.log(data);

      setTotalPage(data.totalPages);

      if (tests) {
        setList(tests);
      } else {
        setList([]);
      }
      
    };

    

    fetchData();
  }, [page, currtype,searchTerm]);

  const onChangePage = (event, value) => {
    setPage(value);
  };
  const navigate = useNavigate();
 

  const handlebtnDetail = (datatest) => {
    
    let newPath = '';
    switch (datatest.type) {
      case type.mixing:
        newPath = `/teacher/test/mixing`;
        break;
      case type.reading:
        newPath = `/teacher/test/reading`;
        break;
      case type.listening:
        newPath = `/teacher/test/listening`;
        break;
      case type.speaking:
        newPath = `/teacher/test/speaking`;
        break;
      case type.writing:
        newPath = `/teacher/test/writing`;
        break;
      default:
        break;
    }

    navigate(newPath, { state: {
      id: datatest.id,
      type: datatest.type,
  }});


  };
  return (
    <Container maxWidth="lg" sx={{ marginTop: "4rem", marginBottom: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        TEST MANAGEMENT
      </Typography>
      <NewTest key={version} open={open} onClose={handleClose} serial = {newTestSerial} type = {currtype}  handlebtnDetail ={handlebtnDetail}/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          gap: "1rem",
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
          sx={{ marginLeft: 2, whiteSpace: "nowrap" }}
          onClick={handleOpen}
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
            {list.map((test) => (
              <TableRow key={test.serial}>
                <TableCell>{test.serial}</TableCell>
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => handlebtnDetail(test)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
        <CustomPagination
          count={totalPage}
          onChange={onChangePage}
          key={currtype}
        />
      </Stack>
    </Container>
  );
};
export default TestManagement;
