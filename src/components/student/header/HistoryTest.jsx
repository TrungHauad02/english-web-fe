// src/pages/HistoryTest.jsx
import React, { useState } from "react";
import { Box, Grid, Typography, Card, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainPicture from "../common/listTopic/MainPicture";
import Filter from "./Filter"; 

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: "10px",
  marginBottom: "10px",
}));

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
  const [tests, setTests] = useState(testData); // Initial fake test data

  const handleSearch = () => {
    const filteredTests = filterTests();
    setTests(filteredTests);
    setCurrentPage(1); // Reset to page 1 after searching
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

  const currentTests = tests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <MainPicture src={"/bg_history_test.png"} title={"History Test"} />
      <Box p={3}>
        <Box mx="5%">
          <Filter
            filter={filter}
            setFilter={setFilter}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
          <Grid container spacing={2}>
            {currentTests.map((test, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CardStyled variant="outlined">
                  <Typography variant="h6">{test.name}</Typography>
                  <Typography>Date: {test.date.toLocaleString()}</Typography>
                  <Typography>Time: {test.time}</Typography>
                  <Typography>Score: {test.score}</Typography>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
  
          {/* Pagination */}
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(tests.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </>
  );  
};

export default HistoryTest;
