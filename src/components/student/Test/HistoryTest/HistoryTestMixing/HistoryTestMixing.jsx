import React, { useState, useEffect } from "react";
import MainTitle from "../../MainTitle";

import HistoryTestMixingContent from "./HistoryTestMixingContent";
import { Box,CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";
import useColor from "shared/color/Color";
function HistoryTestMixing() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = test?.type || "";
  const navigate = useNavigate();
  const color = useColor();
  const onClickTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/mixing", { state });
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const testResult = await getTest(state.testId, "ACTIVE");
        const historyTest = await getSubmitTest(state.id);

        if (testResult) {
          setTest(testResult);
        }
        if (historyTest) {
          setHistoryTest(historyTest);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id, state.testId]);


  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <MainTitle
        title="Mixing Test"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      {loading && (
        <Box
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
        </Box>
      )}
      <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
        <HistoryTestMixingContent
          title={title}
          test={test}
          onClickTestAgain={onClickTestAgain}
          submitTest={historyTest}
        />
      </Box>
    </>
  );
}

export default HistoryTestMixing;
