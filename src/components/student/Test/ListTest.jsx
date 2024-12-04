import React, { useState, useEffect } from "react";
import { getListTest } from "api/test/listTestApi";
import CustomPagination from "shared/component/pagination/CustomPagination";
import ListTestContent from "./ListTestContent";
import { fetchUserInfo } from "api/user/userService";
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
const TabItem = styled(Tab)(({ theme, selected, isSubTab }) => ({
  backgroundColor: selected ? "#00796B" : isSubTab ? "#E0F7FA" : "#00B8A2",
  color: selected ? "#FFFFFF" : isSubTab ? "#00796B" : "#FFFFFF",
  borderRadius: "1rem 1rem 0 0",
  fontWeight: "bold",
  fontSize: isSubTab ? "0.9rem" : "1rem",
  height: isSubTab ? "2.5rem" : "3.5rem",
  lineHeight: isSubTab ? "2.5rem" : "3.5rem",
  padding: "0 1rem",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  margin: "0 0.25rem",
  "&:hover": {
    backgroundColor: selected ? "#00796B" : isSubTab ? "#B2EBF2" : "#00796B",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    transform: "scale(1.02)",
  },
  "&.Mui-selected": {
    backgroundColor: "#00796B",
    color: "#FFFFFF",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#00796B",
  },
}));

function ListTest() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [version, setVersion] = useState(0);
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
      const user = await fetchUserInfo();

      const data = await getListTest(page, currtype, "", "ACTIVE", user.id);
      const tests = data.content;
      setVersion(version + 1);

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
          src={
            "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
          }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tabs
            value={mainTab}
            onChange={handleMainTabChange}
            sx={{
              display: "flex",
              flex: 1 / 3,
              width: "100%",
            }}
            TabIndicatorProps={{
              style: { display: "none" },
            }}
          >
            <TabItem
              sx={{
                display: "flex",
                flex: 1,
                width: "100%",
              }}
              label="Mixed"
              selected={mainTab === 0}
              isSubTab={false}
            />
            <TabItem
              sx={{
                display: "flex",
                flex: 1,
                width: "100%",
              }}
              label="Skills"
              selected={mainTab === 1}
              isSubTab={false}
            />
          </Tabs>

          {mainTab === 1 && (
            <Tabs
              value={skillTab}
              onChange={handleSkillTabChange}
              sx={{
                display: "flex",
                flex: 2 / 3, // Đồng bộ flex với tab cha
                width: "100%", // Đảm bảo width giống tab cha
              }}
              TabIndicatorProps={{
                style: { display: "none" },
              }}
            >
              {Object.keys(type.skills).map((key, index) => (
                <TabItem
                  sx={{
                    display: "flex",
                    flex: 1, // Đồng bộ flex với tab cha
                    width: "100%", // Đảm bảo width giống tab cha
                  }}
                  key={key}
                  label={type.skills[key]}
                  selected={skillTab === index}
                  isSubTab={true}
                />
              ))}
            </Tabs>
          )}
        </Box>

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
