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
  Switch,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import {  Replay } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { getListTest } from "api/test/listTestApi";
import { getMaxSerial, updateStatus, deleteTest } from "api/test/TestApi";
import CustomPagination from "shared/component/pagination/CustomPagination";
import { useNavigate } from "react-router-dom";
import DeleteSubmitTestDialog from "./common/DeleteSubmitTestDialog";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import NewTest from "./NewTest";
import useColor from "shared/color/Color";
import { toast } from "react-toastify";
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
    all: "ALL",
    mixing: "MIXING",
    reading: "READING",
    listening: "LISTENING",
    speaking: "SPEAKING",
    writing: "WRITING",
  };
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [currType, setCurrType] = useState("ALL");
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(1);
  const [versionPage, setVersionPage] = useState(1);
  const [maxSerial, setMaxSerial] = useState(0);
  const { Color2 } = useColor();
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [testDelete, setTestDelete] = useState(0);
  const [status, setStatus] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("ASC");

  const handleStatusChangeFilter = (event) => {
    const selectedStatus = event.target.value;

    setStatus(selectedStatus);
  };
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;

    setSortOrder(selectedSortOrder);
  };

  const handleOpenDialogDelete = async (testDelete) => {

    if (testDelete?.submitTestIds?.length > 0) {
      setSubmitTestIds(testDelete?.submitTestIds);
      setOpenDialogDeleteSubmitTest(true);

      const dialogResult = await waitForDialogAction(
        () => dialogAction,
        () => setDialogAction(null)
      );
      if (dialogResult === "cancel") {
        return;
      }
    }
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
        setVersion((prevVersion) => prevVersion + 1);
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
    setVersion(version + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setCurrType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adjustedType = currType === "ALL" ? "" : currType;
        const adjustedStatus = status === "ALL" ? "" : status;
        const data = await getListTest(
          page,
          adjustedType,
          searchTerm,
          adjustedStatus,
          "",
          sortOrder
        );
        const tests = data.content;
        const serial = await getMaxSerial();
        setMaxSerial(serial + 1 || 0);
    
        setVersionPage(versionPage + 1);
        setTotalPage(data.totalPages);
    
        if (tests) {
          setList(tests);
        } else {
          setList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setList([]);
        setTotalPage(0);
        setMaxSerial(0);
      }
    };
    fetchData();
    
  }, [page, currType, searchTerm, status, sortOrder,version]);

  //xoá submit test
  const [openDialogDeleteSubmitTest, setOpenDialogDeleteSubmitTest] =
    useState(false);
  const [submitTestIds, setSubmitTestIds] = useState([]);

  const [dialogAction, setDialogAction] = useState(null);
  const handleDialogAction = (action) => {
  
    if (action === "cancel") {
      setDialogAction("cancel");
    } else if (action === "confirm") {
      setDialogAction("confirm");
    }
    setVersion((prevVersion) => prevVersion + 1);
    setOpenDialogDeleteSubmitTest(false);
  };

  const waitForDialogAction = (getDialogAction, resetDialogAction) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const action = getDialogAction();
        if (action) {
          clearInterval(interval);
          resolve(action);
          resetDialogAction();
        }
      }, 100);
    });
  };


  const handleResetFilter = () => {
    setStatus("ALL");
    setSortOrder("ASC");
    setCurrType("ALL");
    setSearchTerm("");

   
  };

  const handleStatusChange = async (event, test) => {
    if (test?.submitTestIds?.length > 0) {
      setSubmitTestIds(test?.submitTestIds);
      setOpenDialogDeleteSubmitTest(true);
      const dialogResult = await waitForDialogAction(
        () => dialogAction,
        () => setDialogAction(null)
      );

      if (dialogResult === "cancel") {
        toast.info("Action cancelled.");
        return;
      }
    }

    updateStatus(test.id)
      .then((response) => {
        toast.success(`Status of "${test.title}" updated successfully!`);

        setList((prevList) => {
          return prevList.map((item) => {
            if (item.id === test.id) {
              return {
                ...item,
                status: event.target.checked ? "INACTIVE" : "ACTIVE",
              };
            }
            return item;
          });
        });
      })
      .catch((error) => {
        toast.error("Failed to update status!");
      });
  };

  const onChangePage = (event, value) => {
    setPage(value);
  };

  const navigate = useNavigate();

  const handleBtnDetail = (test) => {
    let newPath = "";
    switch (test.type) {
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

    navigate(newPath, {
      state: {
        id: test.id,
        type: test.type,
      },
    });
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
      <NewTest
        key={version}
        open={open}
        onClose={handleClose}
        serial={maxSerial}
        handleBtnDetail={handleBtnDetail}
      />
      <ConfirmDialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        onAgree={handleAgreeDelete}
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${testDelete?.title}?`}
        cancelText="Cancel"
        agreeText="Delete"
      />
      <DeleteSubmitTestDialog
        open={openDialogDeleteSubmitTest}
        onClose={handleDialogAction}
        submitTestIds={submitTestIds}
        content={`Are you sure you want to delete ${
          submitTestIds?.length || 0
        } history users of this test?`}
      />
      <Box sx={{ marginBottom: "2rem" }}>
  <Grid container spacing={2} alignItems="center">

    <Grid item xs={12} sm={6} md={2} sx={{ display: "flex" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={currType}
          onChange={handleFilterChange}
          label="Type"
        >
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value={type.mixing}>Mixing</MenuItem>
          <MenuItem value={type.reading}>Reading</MenuItem>
          <MenuItem value={type.listening}>Listening</MenuItem>
          <MenuItem value={type.speaking}>Speaking</MenuItem>
          <MenuItem value={type.writing}>Writing</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={2} sx={{ display: "flex" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          onChange={handleStatusChangeFilter}
          label="Status"
        >
          <MenuItem value="ALL">ALL</MenuItem>
          <MenuItem value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="INACTIVE">INACTIVE</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={2} sx={{ display: "flex" }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="sortOrder-label">Sort Order</InputLabel>
        <Select
          labelId="sortOrder-label"
          value={sortOrder}
          onChange={handleSortChange}
          label="Sort Order"
        >
          <MenuItem value="ASC">Serial ASC</MenuItem>
          <MenuItem value="DESC">Serial DESC</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6} md={4} sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Search Test"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <IconButton
        sx={{ marginLeft: 1 }}
        onClick={() => handleResetFilter()} 
      >
        <Replay />
      </IconButton>
    </Grid>
    <Grid item xs={12} sm={6} md={2}>
      <ColorButton
        color={Color2}
        variant="contained"
        fullWidth
        sx={{
          whiteSpace: "nowrap",
          padding: "8px 16px",
          borderRadius: "8px",
        }}
        onClick={handleOpen}
      >
        Add new test
      </ColorButton>
          </Grid>
        </Grid>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "8px", overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Serial</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Details
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Change Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((test, index) => (
              <TableRow
                key={test.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell>{test.serial}</TableCell>
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.type}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleBtnDetail(test)}
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      borderRadius: "1rem",
                      textTransform: "none",
                      fontWeight: "bold",
                      padding: "0.5rem 1rem",
                      "&:hover": { backgroundColor: "#333" },
                    }}
                  >
                    Details
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Switch
                    checked={test.status === "ACTIVE"}
                    onChange={(event) => handleStatusChange(event, test)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: Color2,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: Color2,
                        },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#ccc",
                      },
                    }}
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleOpenDialogDelete(test)}
                    sx={{
                      color: "red",
                      "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
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
          page={page}
          count={totalPage}
          onChange={onChangePage}
          key={currType}
        />
      </Stack>
    </Container>
  );
};
export default TestManagement;
