import React, { useState, useEffect } from "react";
import { getListTest } from "api/test/listTestApi";
import CustomPagination from "shared/component/pagination/CustomPagination";
import ListTestContent from "./ListTestContent";

import { Box, Typography, Tabs, Tab, Stack, styled } from "@mui/material";

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "70vh",
  overflow: "hidden",
}));

const MainTitleContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  position: "absolute",
  left: 0,
  bottom: 0,
  textAlign: "center",
  color: "black",
  background:
    "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 100%)",
  borderRadius: "0 20px 0 0",
}));

const TabItem = styled(Tab)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#E3F2FD",

  borderRadius: "2rem 2rem 0 0",
  fontWeight: "bold",
  fontSize: "1rem",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#90CAF9",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.02)",
  },
  "&.Mui-selected": {
    backgroundColor: "#6EC2F7",
    color: "#FFFFFF",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#6EC2F7",
  },
}));

function ListTest() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const type = {
    mixed: "MIXING",
    skills: {
      reading: "READING",
      listening: "LISTENING",
      speaking: "SPEAKING",
      writing: "WRITING",
    },
  };

  const [currtype, setCurrtype] = useState(type.mixed);
  const [mainTab, setMainTab] = useState(0);
  const [skillTab, setSkillTab] = useState(0);

  const handleMainTabChange = (event, newValue) => {
    setMainTab(newValue);
    setPage(1);
    if (newValue === 0) {
      setCurrtype(type.mixed);
    } else {
      setCurrtype(type.skills.reading);
      setSkillTab(0);
    }
  };

  const handleSkillTabChange = (event, newValue) => {
    setSkillTab(newValue);
    const skillKeys = Object.keys(type.skills);
    setCurrtype(type.skills[skillKeys[newValue]]);
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListTest(page, currtype);
      const tests = data.content;
      console.log(tests);

      setTotalPage(data.totalPages);
      if (tests) {
        setList(tests);
      } else {
        setList([]);
      }
    };

    fetchData();
  }, [page, currtype]);
  const onChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <Box>
      <ImageContainer>
        <img
          src={"/bg_test.png"}
          alt="Test"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <MainTitleContainer>
          <Typography variant="h4" component="h1" sx={{ margin: 2 }}>
            TEST ONLINE
          </Typography>
        </MainTitleContainer>
      </ImageContainer>
      <Box sx={{ marginLeft: "5%", marginRight: "5%", marginTop: "2%" }}>
        <Tabs
          value={mainTab}
          onChange={handleMainTabChange}
          sx={{ display: "flex" }}
          indicatorColor="none"
        >
          <TabItem label="Mixed" />
          <TabItem label="Skills" />
        </Tabs>
        {mainTab === 1 && (
          <Box sx={{ marginTop: "1rem" }}>
            <Tabs
              value={skillTab}
              onChange={handleSkillTabChange}
              sx={{ display: "flex" }}
              indicatorColor="none"
            >
              {Object.keys(type.skills).map((key, index) => (
                <TabItem key={key} label={type.skills[key]} />
              ))}
            </Tabs>
          </Box>
        )}
        <ListTestContent list={list} />
        <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
          <CustomPagination
            count={totalPage}
            onChange={onChangePage}
            key={currtype}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ListTest;
