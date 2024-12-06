import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MainTitle from "../../MainTitle";
import BtnPreviousNextContentTest from "../../common/BtnPreviousNextContentTest";
import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";

import ContentTestWriting from "./HistoryTestWritingContent";
import { useLocation, useNavigate } from "react-router-dom";

function TestWriting() {
  const [indexVisible, setIndexVisible] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [historyTest, setHistoryTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResult = await getTest(state.testId, "ACTIVE");
        const historyTestResult = await getSubmitTest(state.id);

        if (testResult) {
          const updateDataTest = (data) => {
            let serialCounter = 1;
            data.testWritings = data.testWritings.map((item) =>
              item.serial !== undefined
                ? { ...item, serial: serialCounter++ }
                : item
            );

            return data;
          };

          const updatedData = updateDataTest(testResult);

          setTest(updatedData);
        }
        if (historyTestResult) {
          setHistoryTest(historyTestResult);
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

  const onClickTestAgain = () => {
    const state = {
      id: test.id,
    };
    navigate("/student/test/writing", { state });
  };

  return (
    <Box>
      <MainTitle
        title="Writing"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      <Box sx={{ marginLeft: "5%", marginRight: "5%", marginBottom: "1rem" }}>
        <BtnPreviousNextContentTest
          indexVisible={indexVisible}
          setIndexVisible={setIndexVisible}
          sumcontent={test?.testWritings.length}
        />
        <ContentTestWriting
          oneWriting={test?.testWritings[indexVisible]}
          onClickTestAgain={onClickTestAgain}
          oneHistoryWriting={historyTest?.submitTestWritings[indexVisible]}
          Maxscore={100 / test?.testWritings?.length}
        />
      </Box>
    </Box>
  );
}

export default TestWriting;
