import MainTitle from "../MainTitle";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SpeakingTesting from "./SpeakingTesting";
import { getTest } from "api/test/TestApi";
import { useLocation } from "react-router-dom";

function TestSpeaking() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [submitTest, setSubmitTest] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = datatest ? datatest.type : "";
  const [version, setVersion] = useState(0);

  const [status, setStatus] = useState("Testing");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id, "ACTIVE");
        if (data) {
          const updateDataTest = (data) => {
            let serialCounter = 1;
            data.testSpeakings = data.testSpeakings.map((item) => ({
              ...item,
              questions: item.questions.map((question) =>
                question.serial !== undefined
                  ? { ...question, serial: serialCounter++ }
                  : question
              ),
            }));
            return data;
          };

          const updatedData = updateDataTest(data);

          setdatatest(updatedData);
          setStoreName("MyStore" + data.id);
        } else {
          setdatatest(null);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box>
      <MainTitle
        title={title}
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      <Box sx={{ marginLeft: "5%", marginRight: "5%", marginBottom: "1rem" }}>
        <Box sx={{ marginTop: "1rem" }}>
          <SpeakingTesting
            key={version}
            datatest={datatest}
            status={status}
            setStatus={setStatus}
            setSubmitTest={setSubmitTest}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TestSpeaking;
