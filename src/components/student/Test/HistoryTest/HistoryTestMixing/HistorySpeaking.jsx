import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Container,
    Paper,
    Box,
    Button,
    Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SubmitTestSpeakignContent = ({ submitTestSpeakingList, testSpeakingList, focusedSerial }) => {
    const questionRefs = useRef({});
    const [highlightedSerial, setHighlightedSerial] = useState(focusedSerial);
    const [showExplanation, setShowExplanation] = useState(null);
    const [showComment, setShowComment] = useState(null);

    useEffect(() => {
        if (focusedSerial && questionRefs.current[focusedSerial]) {
            questionRefs.current[focusedSerial].scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedSerial(focusedSerial);

            setTimeout(() => {
                setHighlightedSerial(null);
            }, 2000);
        }
    }, [focusedSerial]);

    const toggleExplanation = (serial) => {
        setShowExplanation((prev) => (prev === serial ? null : serial));
    };

    const toggleComment = (serial) => {
        setShowComment((prev) => (prev === serial ? null : serial));
    };

    return (
        <Container>
            {(testSpeakingList || []).map((test, testIndex) => (
                <Card key={testIndex} variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2 }}>{test.title || 'No Title'}</Typography>
                        {(test.questions || []).map((question, qIndex) => {
                            const relatedSubmit = (submitTestSpeakingList || []).find(
                                (submit) => submit.testSpeakingQuestionId === question.id
                            );

                            return (
                                <Paper
                                    key={qIndex}
                                    ref={(el) => questionRefs.current[question.serial] = el}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        elevation: 2,
                                        backgroundColor: question.serial === highlightedSerial ? '#e3f2fd' : 'inherit',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseEnter={() => {
                                        if (question.serial === highlightedSerial) {
                                            setHighlightedSerial(null);
                                        }
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Question {question.serial}
                                        </Typography>
                                        {relatedSubmit && (
                                            <Typography variant="subtitle1" color="error">
                                                {relatedSubmit.score}/
                                                {submitTestSpeakingList?.length > 0
                                        ? (100 /6/ submitTestSpeakingList.length).toFixed(0)
                                        : "N/A"}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        {question.content || 'No content available'}
                                    </Typography>
                                    {relatedSubmit ? (
                                        <Box mt={1}>
                                            {relatedSubmit.content ? (
                                                <audio controls src={relatedSubmit.content} style={{ width: '100%' }} />
                                            ) : (
                                                <Typography variant="body2" color="error">
                                                    No audio answer provided.
                                                </Typography>
                                            )}
                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={() => toggleExplanation(question.serial)}
                                                sx={{ color: '#42a5f5', textTransform: 'none', mt: 1 }}
                                            >
                                                Explain {showExplanation === question.serial ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </Button>
                                            <Collapse in={showExplanation === question.serial}>
                                                <Typography variant="body2" sx={{ ml: 2,mt: 1  }}>
                                                    {relatedSubmit.explanation || 'No explanation available'}
                                                </Typography>
                                            </Collapse>

                                            <Button
                                                variant="text"
                                                size="small"
                                                onClick={() => toggleComment(question.serial)}
                                                sx={{ color: '#42a5f5', textTransform: 'none', mt: 1 }}
                                            >
                                                 Comment {showComment === question.serial ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            </Button>
                                            <Collapse in={showComment === question.serial}>
                                                <Typography variant="body2" sx={{ ml: 2,mt: 1}}>
                                                    {relatedSubmit.comment || 'No comment available'}
                                                </Typography>
                                            </Collapse>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="error">
                                            No answer for this question.
                                        </Typography>
                                    )}
                                </Paper>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
};

SubmitTestSpeakignContent.propTypes = {
    submitTestSpeakingList: PropTypes.arrayOf(PropTypes.object).isRequired,
    testSpeakingList: PropTypes.arrayOf(PropTypes.object).isRequired,
    focusedSerial: PropTypes.string,
};

SubmitTestSpeakignContent.defaultProps = {
    focusedSerial: null,
};

export default SubmitTestSpeakignContent;
