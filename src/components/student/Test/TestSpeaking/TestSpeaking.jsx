import MainTitle from "../MainTitle";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SpeakingTesting from "./SpeakingTesting";
import { getTest } from "api/test/TestApi";
import { useLocation,useNavigate } from "react-router-dom";
import ErrorMessage from "../common/ErrorMessage";
function TestSpeaking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [test, setTest] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const title = test ? test.type : "";



  useEffect(() => {
    if (!state || !state.id) {
      navigate("/student/tests");
      return;
    }
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

          setTest(updatedData);

        } else {
          setTest(null);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state?.id]);

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
      {test?.testWritings?.length > 0 ? (
      <>
        <Box sx={{ marginTop: "1rem" }}>
          <SpeakingTesting
            test={test}
          />
        </Box>
        </> )   : (
        <ErrorMessage message={"The teacher has not added the test information yet"}/>
    )}
      </Box>
    </Box>
  );
}

export default TestSpeaking;
