import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MainTitle from "../MainTitle";
import BtnPreviousNextContentTest from "../common/BtnPreviousNextContentTest";
import { getTest } from "api/test/TestApi";
import { createSubmitTest } from "../../../../api/test/submitTest";
import { createSubmitTestWriting } from "../../../../api/test/submitTestWriting";
import { fetchUserInfo } from "../../../../api/user/userService";
import ContentTestWriting from "./ContentTestWriting";
import { useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "../common/CountdownTimer";
import { openDB, saveData, getData, deleteData } from '../common/IndexDB';
import { scoreTestWriting } from "api/feature/scoreTestWriting/scoreTestWriting";
const DurationContainer = styled(Box)(({ theme }) => ({
  background: "#E0F7FA",
  borderRadius: "20px",
  fontSize: "14px",
  float:'right',
  padding: "1.5rem 3rem",
  marginRight: theme.spacing(2),
  border: '1px solid #000000',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
}));

function TestWriting() {
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const [duration, setDuration] = useState({});
  const navigate = useNavigate();
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setSCore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const title = datatest ? datatest.type : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id);
        setStoreName("MyStore" + data.id)
        if (data) {
          setdatatest(data);
          console.log(data);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTest(state.id,"ACTIVE");
        if (data) {
          
          const updateDataTest = (data) => {
            let serialCounter = 1; 
            data.testWritings = data.testWritings.map((item) =>
              item.serial !== undefined
                ? { ...item, serial: serialCounter++ }
                : item
            );
        
            return data;
          };
        
      
          const updatedData = updateDataTest(data);
        

          setdatatest(updatedData);
          setDuration(data.duration); 
          setStoreName("MyStore" + data.id)
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
  }, [state?.id]);
  
  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", "MyStore" + datatest.id)
        .then((db) => {
          getData(db, "MyStore" + datatest.id,storeName)
            .then((data) => {
              if (data?.answers) {
                console.log(data?.answers);
                
                setAnswers(data.answers);           
              } else {
                console.log("No answers found in IndexedDB");
                setAnswers({}); 
              }
            })
            .catch((error) => {
              console.error("Error fetching answers:", error);
            });
        })
        .catch((error) => {
          console.error("Error accessing IndexedDB:", error);
        });
    }

  }, [datatest?.id]);
  
  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", storeName).then((db) => {
        saveData(db, "MyStore" + datatest.id, { id: storeName, answers });
      }).catch((error) => {
        console.error("Error saving answers to the database:", error);
      });
    }
  }, [answers]);

  const handlebtnSubmit = async () => {
 
    try {
      let user = await fetchUserInfo();
      const vietnamTime = new Date().toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false }).replace(", ", "T");
  
      let submitTest = {
        id: "",
        testId: datatest.id,
        userId: user.id,
        score: 0,
        status: "ACTIVE",
        submitTime: vietnamTime,
        submitTestWritings: [],
      };
      let scoreTest = 0;
  
      let pointPerQuestion = 100 / datatest?.testWritings?.length;

      let comment = "No comment available. You haven't completed this question yet";
      let content = "No content available. You haven't completed this question yet";
  
      for (let writing of datatest?.testWritings) {
        let score = 0;
    
        if (answers[writing.id]?.essay !== null && answers[writing.id]?.essay !== '' && answers[writing.id]?.essay !== undefined) {
         
          let dataScore = await scoreTestWriting(answers[writing.id]?.essay, writing.content, pointPerQuestion);
          console.log(dataScore);
          
          score = dataScore.score.split("/")[0];
          comment = dataScore.comment;
          scoreTest = scoreTest + +score;
          content = answers[writing.id]?.essay;
  
        }
        submitTest.submitTestWritings.push({
          id: "",
          submitTestId: "",
          testWritingId: writing.id,
          content: content,
          comment: comment,
          score: parseFloat(score),
          status: "ACTIVE",
        });
      }
      submitTest.score = scoreTest;
      const createdSubmitTest = await createSubmitTest(submitTest);

      submitTest.id = createdSubmitTest.id;
      if (submitTest?.submitTestWritings?.length > 0) {
     
        for (let i = 0; i < submitTest.submitTestWritings.length; i++) {
          submitTest.submitTestWritings[i].submitTestId = createdSubmitTest.id;
        }
      
        await Promise.all(
          submitTest.submitTestWritings.map(async (writing) => {
            await createSubmitTestWriting(writing);
          })
        );
      } else {
        console.warn("No submitTestWritings available to process.");
      }

      
      const state = {
        id: createdSubmitTest.id,
        testId: datatest.id,
      };
      deleteData('MyDatabase', 'MyStore'+datatest.id);
      navigate("/student/history-test/writing", { state });
    
  
    } catch (error) {
      console.error("Error creating submitTest:", error);
    } finally {
      
      
      setIsSubmitting(false);
    }
  };
  
  
  const onClickTestAgain = () => {};

  return (
    <Box>
      <MainTitle
        title="Writing"
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
        <DurationContainer sx={{ marginRight: "5%" ,fontWeight: 'bold'  }} >
        <Typography align="center" >
        Time remaining: 
        </Typography>
        <Typography align="center" sx={{marginLeft:'1rem'}} >
        {
      datatest && 
      <CountdownTimer
      duration={duration}
      handleSubmit={handlebtnSubmit}
      dbName={"MyDatabase"}
      storeName={storeName}
    />
     }
        </Typography>
      </DurationContainer>
      <Box sx={{marginLeft:'5%',marginRight:'5%',marginBottom:'1rem'}}>
    

      <BtnPreviousNextContentTest
        indexVisible={indexVisible}
        setIndexVisible={setIndexVisible}
        sumcontent={datatest?.testWritings.length}
      />
      <ContentTestWriting
        datatest={datatest?.testWritings[indexVisible]}
        handlebtnSubmit={handlebtnSubmit}
        onClickTestAgain={onClickTestAgain}
        answers={answers}
        setAnswers={setAnswers}
      />
    </Box>
      </Box>
      
  );
}

export default TestWriting;
