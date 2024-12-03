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
  IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { getListTest } from "api/test/listTestApi";
import { getMaxSerial,updateStatus,deleteTest } from "api/test/TestApi";
import CustomPagination from "shared/component/pagination/CustomPagination";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import NewTest from "./NewTest";
import useColor from "shared/color/Color";
import {  toast } from 'react-toastify';
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
    all : "ALL",
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
  const [currtype, setCurrtype] = useState("ALL");
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(1);
  const [versionPage, setVersionPage] = useState(1);
  const [maxSerial,setMaxSerial] = useState(0);
  const { Color1, Color2, Color2_1, Color3, Color4, HeaderBg } = useColor();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [testDelete,setTestDelete] = useState(0);

  const handleOpenDialogDelete = (testDelete) => {
    setTestDelete(testDelete);
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };
  const handleAgreeDelete = async () => {
    await deleteTest(testDelete.id)
      .then(() => {
        toast.success(`${testDelete.title} deleted successfully!`);
        setList((prevList) => prevList.filter((test) => test.id !== testDelete.id));
        handleCloseDialogDelete();
      })
      .catch(() => {
        toast.error(`Failed to delete ${testDelete.title}`);
        handleCloseDialogDelete();
      });
  };

  



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
      const adjustedType = currtype === "ALL" ? "" : currtype;
    
      const data = await getListTest(page, adjustedType,searchTerm);
      const tests = data.content;
      const serial  = await getMaxSerial();
      setMaxSerial(serial+1||0);
     
      setVersionPage(versionPage+1);
   

      setTotalPage(data.totalPages);

      if (tests) {
        setList(tests);
      } else {
        setList([]);
      }
      
    };
    fetchData();
  }, [page, currtype,searchTerm]);


  const handleStatusChange = (event, test) => {
    updateStatus(test.id)
      .then((response) => {
        toast.success(`Status of "${test.title}" updated successfully!`);

        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === test.id) {
              return { ...item, status: event.target.value }; 
            }
            return item;
          });
        });
      })
      .catch((error) => {
        toast.error('Failed to update status!');
      });
  };

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
      <NewTest key={version} open={open} onClose={handleClose} serial = {maxSerial}  handlebtnDetail ={handlebtnDetail}/>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAgree={handleAgreeDelete}
        title="Confirm Deletion"  
        content={`Are you sure you want to delete ${testDelete?.title}?`}
        cancelText="Cancel"  
        agreeText="Delete"  
      />

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
          <MenuItem value="ALL">All</MenuItem>
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
          color={Color2}
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
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.serial}</TableCell>
                <TableCell>{test.title}</TableCell>
                <TableCell align="right">
                  <Select
                    value={test.status}
                    onChange={(event) => handleStatusChange(event, test)} 
                    sx={{

                      backgroundColor:
                        test.status === 'ACTIVE'
                          ? Color2
                          : test.status === 'INACTIVE'
                          ? '#FFEB3B'
                          : '#9E9E9E',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      '& .MuiSelect-icon': {
                        color: 'white',
                      },
                    }}
                  >
                    <MenuItem value="ACTIVE" sx={{ backgroundColor: Color2, color: 'white' }}>ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE" sx={{ backgroundColor: '#FFEB3B', color: 'black' }}>INACTIVE</MenuItem>
                  </Select>
              </TableCell>

                <TableCell align="right">
                  <Button
                    sx={{background:'#000000',color:'#ffffff',borderRadius:'0.5rem'}}
                    variant="outlined"
                    onClick={() => handlebtnDetail(test)}
                  >
                    Detail
                  </Button>
                </TableCell>
                <TableCell align="right">
              <IconButton 
                onClick={() => handleOpenDialogDelete(test)} 
                sx={{
                  color: 'red', 
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Chỉnh màu khi hover
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
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
