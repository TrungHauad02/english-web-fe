import React, { useState } from "react";
import {TextField,Box,Grid,Typography,Card,Button,IconButton,MenuItem,Pagination,} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MainPicture from "../common/listTopic/MainPicture";
import { Search } from '@mui/icons-material';


const Dropdown = styled(TextField)({
  minWidth: 120,
});

const CardStyled = styled(Card)({
  backgroundColor: "#f5f5f5",
  padding: "10px",
  marginBottom: "10px",
});

const DetailsButton = styled(Button)({
  textDecoration: "underline",
});

const Container = styled(Box)({
  width: "90%",
  margin: "auto",
});

const testTypes = ["Vocabulary", "Grammar", "Listening", "Speaking", "Reading", "Writing"];

const testData = Array.from({ length: 19 }, (_, index) => ({
  name: `Test ${index + 1}`,
  date: new Date(2024, 11, index + 1, 12, 20),
  time: "12 minutes",
  score: `${60 + index}/100`,
  type: testTypes[index % testTypes.length],
}));

const ITEMS_PER_PAGE = 10;

const HistoryTest = () => {
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tests, setTests] = useState(testData); // Dữ liệu bài test fake ban đầu

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    if (endDate && newDate > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const filterTests = () => {
    return testData.filter((test) => {
      const matchesName = searchText
        ? test.name.toLowerCase().includes(searchText.toLowerCase())
        : true;

      const matchesType = filter === "All" || test.type === filter;

      const matchesDate =
        (!startDate || test.date >= startDate) &&
        (!endDate || test.date <= endDate);

      return matchesName && matchesType && matchesDate;
    });
  };

  const handleSearch = () => {
    const filteredTests = filterTests();
    setTests(filteredTests);
    setCurrentPage(1); // Reset về trang 1 sau khi tìm kiếm
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const currentTests = tests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <MainPicture src={"/bg_history_test.png"} title={"History Test"} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container p={3}>
          <Grid container spacing={2} alignItems="center" mb={2}>
            {/* Khung tìm kiếm và các bộ lọc nằm cùng hàng */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your test name"
                value={searchText}
                onChange={handleSearchTextChange}
                onKeyPress={handleKeyPress} // Kích hoạt khi nhấn Enter
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Dropdown
                select
                fullWidth
                variant="outlined"
                value={filter}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Vocabulary">Vocabulary</MenuItem>
                <MenuItem value="Grammar">Grammar</MenuItem>
                <MenuItem value="Listening">Listening</MenuItem>
                <MenuItem value="Speaking">Speaking</MenuItem>
                <MenuItem value="Reading">Reading</MenuItem>
                <MenuItem value="Writing">Writing</MenuItem>
              </Dropdown>
            </Grid>

            <Grid item xs={12} sm={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <CalendarTodayIcon />
                        </IconButton>
                      ),
                    }}
                  />
                )}
                maxDate={endDate || null}
              />
            </Grid>

            {/* Arrow between start and end date */}
            <Grid item xs={12} sm={1} container justifyContent="center">
              <ArrowForwardIcon />
            </Grid>

            <Grid item xs={12} sm={2}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <CalendarTodayIcon />
                        </IconButton>
                      ),
                    }}
                  />
                )}
                minDate={startDate || null} // Đảm bảo End Date >= Start Date
              />
            </Grid>

            <Grid item xs={12} sm={1}>
            <Button
                            variant="contained"
                            startIcon={<Search />}
                            onClick={handleSearch}
                            sx={{ marginLeft: '1rem', marginTop: '.5rem' }}
                        >
                            Search
                        </Button>
            </Grid>
          </Grid>

          {/* Khung hiển thị các bài test với phân trang và 2 cột */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* Hiển thị các bài test ở cột trái (index chẵn) */}
              {currentTests
                .filter((_, index) => index % 2 === 0) // Lọc bài test có index chẵn
                .map((test, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="h6">{test.name}</Typography>
                    <CardStyled variant="outlined">
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography>Date: {test.date.toLocaleString()}</Typography>
                          <Typography>Time: {test.time}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Score: {test.score}</Typography>
                        </Grid>
                        <Grid item>
                          <DetailsButton size="small">See details</DetailsButton>
                        </Grid>
                      </Grid>
                    </CardStyled>
                  </Box>
                ))}
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Hiển thị các bài test ở cột phải (index lẻ) */}
              {currentTests
                .filter((_, index) => index % 2 !== 0) // Lọc bài test có index lẻ
                .map((test, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="h6">{test.name}</Typography>
                    <CardStyled variant="outlined">
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography>Date: {test.date.toLocaleString()}</Typography>
                          <Typography>Time: {test.time}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>Score: {test.score}</Typography>
                        </Grid>
                        <Grid item>
                          <DetailsButton size="small">See details</DetailsButton>
                        </Grid>
                      </Grid>
                    </CardStyled>
                  </Box>
                ))}
            </Grid>
          </Grid>

          {/* Pagination */}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(tests.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Container>
      </LocalizationProvider>
    </>
  );
};

export default HistoryTest;
