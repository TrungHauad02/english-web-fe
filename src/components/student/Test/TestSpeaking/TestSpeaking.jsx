import MainTitle from "../MainTitle";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SpeakingTesting from "./SpeakingTesting";
import { getTest } from "api/test/TestApi";
import { useLocation } from "react-router-dom";

function TestSpeaking() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setDataTest] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = datatest ? datatest.type : "";



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

          setDataTest(updatedData);

        } else {
          setDataTest(null);
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

            datatest={datatest}
 
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TestSpeaking;
