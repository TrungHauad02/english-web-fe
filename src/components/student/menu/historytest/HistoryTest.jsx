import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, Pagination, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainPicture from "../../common/listTopic/MainPicture";
import Filter from "./Filter";
import { getListSubmitTests } from "../../../../api/test/submitTest";
import CustomPagination from "shared/component/pagination/CustomPagination";
import { useLocation,useNavigate } from 'react-router-dom';
import { fetchUserInfo } from "api/user/userService";

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: "10px",
  marginBottom: "10px",
}));

const ITEMS_PER_PAGE = 10;

const HistoryTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, type } = location.state || {};


  const [filter, setFilter] = useState(type || "ALL");
  const [searchText, setSearchText] = useState(title || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  
  const [tests, setTests] = useState([]);
  const [totalItems, setTotalItems] = useState(0);


  const fetchTests =  async () => {
    const user = await fetchUserInfo();
    const adjustedType = filter === "ALL" ? "" : filter;
    getListSubmitTests(currentPage,user.id,adjustedType, searchText, searchStartDate, searchEndDate)
      .then((data) => {
        setTests(data.content);
        setTotalItems(data.totalElements);
     
      })
      .catch((error) => {
        console.error("Error fetching submit tests:", error);
     
      });
  };
  const navigateSubmitTest =   (submitTest) => {

    let newPath = "";
    const state = {
      id: submitTest.id,
      testId: submitTest.testId,
    };
    switch (submitTest.testType) {
      case "MIXING":
        newPath = "/student/history-test/mixing";
        break;
      case "READING":
        newPath = "/student/history-test/reading";
        break;
      case "LISTENING":
        newPath = "/student/history-test/listening";
        break;
      case "SPEAKING":
        newPath = "/student/history-test/speaking";
        break;
      case "WRITING":
        newPath = "/student/history-test/writing";
        break;
      default:
        break;
    }
    navigate(newPath, { state });
   

  };

  useEffect(() => {
    fetchTests();
  }, [currentPage,filter]);

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
            handleSearch={() => {
              setCurrentPage(1);
              fetchTests();
            }}
          />
        <Grid container spacing={2}>
        {tests.map((test, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <CardStyled variant="outlined"
              onClick={() => navigateSubmitTest(test)}
            >
              <Typography variant="h6">{test.testTitle}</Typography>
              <Typography>Date: {new Date(test.submitTime).toLocaleString()}</Typography>
              <Typography>
                <strong>Score:</strong> {test.score === -1 ? "Haven’t done yet" : test.score}
              </Typography>
            </CardStyled>
          </Grid>
        ))}
      </Grid>

        </Box>
        <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
          <CustomPagination
            count={Math.ceil(totalItems / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
      </Box>
    </>
  );
};

export default HistoryTest;
