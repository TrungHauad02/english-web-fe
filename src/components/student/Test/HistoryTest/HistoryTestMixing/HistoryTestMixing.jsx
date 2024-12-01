import React, { useState, useEffect } from "react";
import MainTitle from "../../MainTitle";

import HistoryTestMixingContent from "./HistoryTestMixingContent";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";

function HistoryTestMixing() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const score = historyTest?.score;
  const title = test?.type || "";
  const navigate = useNavigate();

  const onClickTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/mixing", { state });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const test = await getTest(state.testId);
        const historyTest = await getSubmitTest(state.id);

        if (test) {
          setTest(test);
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

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
        <HistoryTestMixingContent
          title={title}
          datatest={test}
          onClickTestAgain={onClickTestAgain}
          submitTest={historyTest}
        />
      </Box>
    </>
  );
}

export default HistoryTestMixing;
