import React, { useState } from "react";
import {
  TextField,
  Box,
  Grid,
  Typography,
  Card,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MainPicture from "../common/listTopic/MainPicture";

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

const ScrollContainer = styled(Box)({
  maxHeight: "300px",
  overflowY: "auto",
  border: "1px solid #ccc",
  padding: "10px",
  marginTop: "20px",
});

const tests = [
  {
    name: "Reading Test 1",
    date: "12/2/2024, 12:20",
    time: "12 minutes",
    score: "80/100",
  },
  {
    name: "Speaking Test 1",
    date: "12/2/2024, 12:20",
    time: "12 minutes",
    score: "60/100",
  },
  {
    name: "Writing Test 1",
    date: "12/2/2024, 12:20",
    time: "12 minutes",
    score: "70/100",
  },
  {
    name: "Writing Test 2",
    date: "12/3/2024, 14:30",
    time: "10 minutes",
    score: "75/100",
  },
  {
    name: "Writing Test 3",
    date: "12/4/2024, 16:00",
    time: "15 minutes",
    score: "65/100",
  },
];

const HistoryTest = () => {
  const [filter, setFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    if (startDate && newDate < startDate) {
      setStartDate(null);
    }
  };

  return (
    <>
      <MainPicture src={"/bg_history_test.png"} title={"History Test"} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box p={3} mx={"auto"}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter your test name"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            mb={2}
            alignItems="center"
            justifyContent="center"
          >
            {/* Filter dropdown */}
            <Grid item xs={12} sm={3}>
              <Dropdown
                select
                fullWidth
                variant="outlined"
                value={filter}
                onChange={handleFilterChange}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Reading">Reading</MenuItem>
                <MenuItem value="Listening">Listening</MenuItem>
                <MenuItem value="Speaking">Speaking</MenuItem>
                <MenuItem value="Writing">Writing</MenuItem>
              </Dropdown>
            </Grid>

            {/* Start date picker */}
            <Grid item xs={12} sm={4}>
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

            {/* End date picker */}
            <Grid item xs={12} sm={4}>
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
                minDate={startDate || null}
              />
            </Grid>
          </Grid>
          <ScrollContainer>
            {tests.map((test, index) => (
              <Box key={index} mb={2}>
                <Typography variant="h6">{test.name}</Typography>
                <CardStyled variant="outlined">
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Date: {test.date}</Typography>
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
          </ScrollContainer>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default HistoryTest;
