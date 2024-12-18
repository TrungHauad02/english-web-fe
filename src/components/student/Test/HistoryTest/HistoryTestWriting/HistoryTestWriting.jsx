import React, { useState, useEffect } from "react";
import { Box,Typography,Paper,CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../../MainTitle";
import BtnPreviousNextContentTest from "../../common/BtnPreviousNextContentTest";
import useColor from "shared/color/Color";
import { getHistoryTest } from "../common/getHistoryTest";
import ContentTestWriting from "./HistoryTestWritingContent";
import { useLocation, useNavigate } from "react-router-dom";
const DurationContainer = styled(Paper)(({ theme }) => ({
  background: "#FFF4CC",
  borderRadius: "20px",
  fontSize: "14px",
  float: "right",
  marginRight: "5%",
  padding: theme.spacing(2),
}));
function TestWriting() {
  const [indexVisible, setIndexVisible] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const color = useColor();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHistoryTest(state, navigate);
        if (result) {
          const { test, submitTest } = result;
  
          if (test) {
            const updateDataTest = (data) => {
              let serialCounter = 1;
              data.testWritings = data.testWritings.map((item) =>
                item.serial !== undefined
                  ? { ...item, serial: serialCounter++ }
                  : item
              );
          
              return data;
            };
            const updatedData = updateDataTest(test);
            setTest(updatedData); 
          }
  
          if (submitTest) {
            setHistoryTest(submitTest); 
          }
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, state?.id, state?.testId]);

  if (loading) {
    return <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 1000,
    }}
  >
    <CircularProgress sx={{color: color.Color2}} />
  </Box>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onClickTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/writing", { state });
  };
  const score = historyTest?.score;
  return (
    <Box>
      <MainTitle
        title="Writing"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      <DurationContainer
        sx={{
          marginRight: "5%",
          textAlign: "center",
          backgroundColor: "#E0F7FA",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #E0C080",
        }}
        elevation={2}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: "#5A5A5A",
          }}
        >
          Score: {score}
        </Typography>
      </DurationContainer>
      <Box sx={{ marginLeft: "5%", marginRight: "5%", marginBottom: "1rem" }}>
        <BtnPreviousNextContentTest
          indexVisible={indexVisible}
          setIndexVisible={setIndexVisible}
          sumContent={test?.testWritings.length}
        />
        <ContentTestWriting
          oneWriting={test?.testWritings[indexVisible]}
          onClickTestAgain={onClickTestAgain}
          oneHistoryWriting={historyTest?.submitTestWritings[indexVisible]}
          maxScore={100 / test?.testWritings?.length}
        />
      </Box>
    </Box>
  );
}

export default TestWriting;
