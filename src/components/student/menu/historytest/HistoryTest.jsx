import React, { useState } from "react";
import { Box, Grid, Typography, Card, Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainPicture from "../../common/listTopic/MainPicture";
import Filter from "./Filter";
import { handleSearch } from "./HandleHistoryTest";

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: "10px",
  marginBottom: "10px",
}));

const testTypes = [
  "Vocabulary",
  "Grammar",
  "Listening",
  "Speaking",
  "Reading",
  "Writing",
];

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
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);

  const [tests, setTests] = useState(testData);

  const currentTests = tests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <MainPicture
        src={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_history_test.png?alt=media"
        }
        title={"History Test"}
      />
      <Box p={3}>
        <Box mx="5%">
          <Filter
            filter={filter}
            setFilter={setFilter}
            searchText={searchText}
            setSearchText={setSearchText}
            searchStartDate={searchStartDate}
            setSearchStartDate={setSearchStartDate}
            searchEndDate={searchEndDate}
            setSearchEndDate={setSearchEndDate}
            handleSearch={() =>
              handleSearch(
                testData,
                searchText,
                filter,
                setTests,
                setCurrentPage
              )
            }
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
