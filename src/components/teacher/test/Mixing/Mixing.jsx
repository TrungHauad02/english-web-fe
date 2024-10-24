import InformationTest from "../common/InformationTest";
import QuestionListTest from "../common/QuestionListTest";
import QuestionVocabulary from "../common/QuestionVocabulary";
import QuestionGrammar from "../common/QuestionGrammar";
import QuestionListening from "../common/QuestionListening";
import React, { useState, useEffect } from 'react';
import QuestionReading from "../common/QuestionReading";
import QuestionWriting from "../common/QuestionWriting";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { getTestById } from '../../../../api/teacher/test/TestApi';
import { getQuestionGrammarById } from '../../../../api/teacher/test/TestGrammarApi';
import { getQuestionVocabularyById } from '../../../../api/teacher/test/TestVocabularyApi';
import { getReadingById } from '../../../../api/teacher/test/TestReadingApi';
import { getListeningById } from '../../../../api/teacher/test/TestListeningApi';
import { getSpeakingById } from '../../../../api/teacher/test/TestSpeakingApi';

function Mixing() {
    const location = useLocation();
    const { state } = location; 
    const [datatest, setdatatest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newQuestion,setNewQuestion] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTestById(state.id);
                if (data) {
                    setdatatest(data);
                } else {
                    setdatatest(null); // Handle empty data
                }
            } catch (err) {
                setError("Failed to fetch test data");
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [state.id,newQuestion]);
    
    const [type, setType] = useState('');
    const [dataitemtest, setdataitemtest] = useState();
    const [questionData, setQuestionData] = useState(); // State to hold the question data

    const handleRowClick = async (question) => {
        setType(question.type);
        if(question.new)
        {
            setNewQuestion(question)
        }
        setdataitemtest(question);
        try {
            let fetchedData;
            switch (question.type) {
                case 'Grammar':
                    fetchedData = await getQuestionGrammarById(question.id);
                    break;
                case 'Vocabulary':
                    fetchedData = await getQuestionVocabularyById(question.id);
                    break;
                case 'Listening':
                    fetchedData = await getListeningById(question.id);
                    break;
                case 'Reading':
                    fetchedData = await getReadingById(question.id);
                    break;
                case 'Writing':
                    fetchedData = await getSpeakingById(question.id);
                    break;
                default:
                    fetchedData = null;
            }
            setQuestionData(fetchedData); 
        } catch (err) {
            setError("Failed to fetch question data");
        }
    };

    if (loading) {
        return <CircularProgress />;
    }
    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const renderQuestionComponent = () => {
        if (!questionData) return null; // Không render nếu không có dữ liệu câu hỏi

        switch (type) {
            case 'Vocabulary':
                return <QuestionVocabulary key={questionData.id} question={questionData} />;
            case 'Grammar':
                return <QuestionGrammar key={questionData.id} question={questionData} />;
            case 'Listening':
                return <QuestionListening key={questionData.id} data={questionData} />;
            case 'Reading':
                return <QuestionReading key={questionData.id} data={questionData} />;
            case 'Writing':
                return <QuestionWriting key={questionData.id} data={questionData} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ marginRight: '5%', marginLeft: '5%', marginBottom: '2%', marginTop: "2%" }}>
            <Box sx={{ display: 'flex', marginBottom: '2%', alignItems: 'stretch' }}>
                <Box sx={{ flex: 4, minHeight: 0 }}>
                    <InformationTest data={datatest} />
                </Box>
                <Box sx={{ marginLeft: '2%', flex: 6, minHeight: 0 }}>
                    <QuestionListTest data={datatest} handleRowClick={handleRowClick} />
                </Box>
            </Box>
            {renderQuestionComponent()}
        </Box>
    );
}

export default Mixing;
