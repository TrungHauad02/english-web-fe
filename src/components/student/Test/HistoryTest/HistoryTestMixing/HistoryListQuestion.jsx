import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function ListQuestionSubmit({ dataTest, focusId, dataSubmitTest }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const questionRefs = useRef({});
    const [isFocused, setIsFocused] = useState({});
    const [expandedSections, setExpandedSections] = useState({}); 

    useEffect(() => {
        if (focusId && questionRefs.current[focusId]) {
            questionRefs.current[focusId].focus();
            setIsFocused((prev) => ({ ...prev, [focusId]: true }));
            setTimeout(() => {
                questionRefs.current[focusId].blur();
                setIsFocused((prev) => ({ ...prev, [focusId]: false }));
            }, 500);
        }
    }, [focusId]);

    useEffect(() => {
        const selectedMap = {};
        if (Array.isArray(dataSubmitTest)) {
            dataSubmitTest.forEach(submit => {
                selectedMap[submit.questionId] = submit.answerId;
            });
        } else {
            console.warn("dataSubmitTest is not an array or is undefined");
        }
        setSelectedAnswers(selectedMap);
    }, [dataSubmitTest]);
    

    const toggleSection = (id, section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [section]: !prev[id]?.[section],
            },
        }));
    };

    return (
        <FormControl component="fieldset">
            {dataTest?.map((questionNumber) => (
                <Box key={questionNumber.id} sx={{ mb: 3, marginTop: '2%' }}
                    ref={(el) => questionRefs.current[questionNumber.serial] = el}
                    tabIndex="0"
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{
                                padding: '0.5rem 1rem',
                                borderRadius: '50%',
                                backgroundColor: '#ACCD0A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: '500',
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                {questionNumber.serial}
                            </Typography>
                        </Box>
                        <Typography variant="body1" gutterBottom sx={{ ml: 1 }}>
                            {questionNumber.content}
                        </Typography>
                    </Box>
                    <RadioGroup
                        sx={{ marginLeft: '1.5rem' }}
                        value={selectedAnswers[questionNumber.id] || ''}
                    >
                        {questionNumber.answers?.map((answer) => {
                            const isSelected = selectedAnswers[questionNumber.id] === answer.id;
                            const isCorrect = answer.isCorrect;
                            const isUserWrong = isSelected && !isCorrect;
                            return (
                                <FormControlLabel
                                    key={answer.id}
                                    value={answer.id}
                                    control={
                                        <Radio
                                            onClick={(e) => e.preventDefault()} // Prevent selecting again
                                        />
                                    }
                                    label={` ${answer.content}`}
                                    sx={{
                                        fontWeight: isSelected ? 'bold' : 'normal',
                                        color: isCorrect ? 'green' : (isUserWrong ? 'red' : 'inherit'),
                                    }}
                                />
                            );
                        })}
                    </RadioGroup>
                    <Button
                        onClick={() => toggleSection(questionNumber.id, 'explain')}
                        sx={{ mt: 1, color: 'primary.main', textTransform: 'none', fontSize: '0.875rem' }}
                        variant="text"
                        endIcon={expandedSections[questionNumber.id]?.explain ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        Explain
                    </Button>
                    <Collapse in={expandedSections[questionNumber.id]?.explain}>
                        <Typography variant="body2" sx={{ ml: 2,mt: 1 }}>
                            {questionNumber.explanation || 'No explanation provided.'}
                        </Typography>
                    </Collapse>
                    <Button
                        onClick={() => toggleSection(questionNumber.id, 'comment')}
                        sx={{ mt: 1, color: 'primary.main', textTransform: 'none', fontSize: '0.875rem' }}
                        variant="text"
                        endIcon={expandedSections[questionNumber.id]?.comment ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        Comment
                    </Button>
                    <Collapse in={expandedSections[questionNumber.id]?.comment}>
                        <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                            {Array.isArray(dataSubmitTest) && dataSubmitTest.find(submit => submit?.questionId === questionNumber.id)?.comment || 'No comment provided.'}
                        </Typography>
                    </Collapse>

                </Box>
            ))}
        </FormControl>
    );
}

export default ListQuestionSubmit;
