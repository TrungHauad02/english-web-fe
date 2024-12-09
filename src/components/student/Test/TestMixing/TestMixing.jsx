import React, { useState, useEffect } from "react";
import MainTitle from "../MainTitle";
import ItemTest from "./ItemTest";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getTest } from "api/test/TestApi";

function TestMixing() {
  const location = useLocation();
  const { state } = location;
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Testing");
 

  const title = test ? test.type : "";
  useEffect(() => {
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
  }, [state.id]);

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
        {status === "Testing" && (
          <ItemTest
            title={title}
            test={test}
            setStatus={setStatus}
          />
        )}
      </Box>
    </>
  );
}

export default TestMixing;
