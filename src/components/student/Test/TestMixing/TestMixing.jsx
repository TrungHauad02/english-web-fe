import React, { useState, useEffect } from "react";
import MainTitle from "../MainTitle";
import ItemTest from "./ItemTest";
import { Box,CircularProgress } from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import { getTest } from "api/test/TestApi";
import useColor from "shared/color/Color";
import ErrorMessage from "../common/ErrorMessage";
function TestMixing() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const color = useColor();
  const title = test ? test.type : "";
  useEffect(() => {
    if (!state || !state.id) {
      navigate("/student/tests");
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getTest(state.id,"ACTIVE");
        if (data) {
          setTest(data);
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
      {loading ? (
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
          <CircularProgress sx={{ color: color.Color2 }} />
        </Box>
      ) : (
        <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
          {[
            test?.testListenings?.length || 0,
            test?.testReadings?.length || 0,
            test?.testWritings?.length || 0,
            test?.testSpeakings?.length || 0,
            test?.testMixingQuestions?.length || 0,
          ].reduce((acc, cur) => acc + cur, 0) > 0 ? (
            <>
              <ItemTest title={title} test={test} />
            </>
          ) : (
            <ErrorMessage message={"The teacher has not added the test information yet"} />
          )}
        </Box>
      )}
    </>
  );
}

export default TestMixing;
