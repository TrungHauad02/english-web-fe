import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Container,
    Paper,
    Box,
    Collapse,
    Button,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SubmitTestWritingContent = ({ testWritingList, submitTestWritingList, focusedSerial }) => {
    const questionRefs = useRef({});
    const [highlightedSerial, setHighlightedSerial] = useState(focusedSerial);
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

    const toggleComment = (serial) => {
        setShowComment((prev) => (prev === serial ? null : serial));
    };

    return (
        <Container>
            {(testWritingList || []).map((test, index) => {
                const relatedSubmit = (submitTestWritingList || []).find(
                    (submit) => submit.testWritingId === test.id
                );

                return (
                    <Card
                        key={index}
                        sx={{
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: 1,
                            backgroundColor: '#ffffff',
                            border: '1px solid #e0e0e0',
                            position: 'relative',
                        }}
                    >
                        <CardContent>
                            <Paper
                                ref={(el) => (questionRefs.current[test.serial] = el)}
                                sx={{
                                    p: 2,
                                    backgroundColor: test.serial === highlightedSerial ? '#e3f2fd' : '#ffffff',
                                    transition: 'background-color 0.3s ease',
                                    borderRadius: 1,
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Question {test.serial}
                                    </Typography>
                                    {relatedSubmit && (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {relatedSubmit.score !== null ? `${relatedSubmit.score}/10` : '/10'}
                                        </Typography>
                                    )}
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    {test.content || 'No content available'}
                                </Typography>
                                {relatedSubmit ? (
                                    <Box>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            <strong>Your Answer:</strong> {relatedSubmit.content || 'No answer provided'}
                                        </Typography>
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() => toggleComment(test.serial)}
                                            sx={{ color: '#42a5f5', textTransform: 'none' }}
                                            endIcon={showComment === test.serial ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        >
                                            View Comment
                                        </Button>
                                        <Collapse in={showComment === test.serial}>
                                            <Typography variant="body2" sx={{ ml: 2,mt: 1 , color: '#616161' }}>
                                                <strong>Comment:</strong> {relatedSubmit.comment || 'No comment provided'}
                                            </Typography>
                                        </Collapse>
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="error">
                                        No answer for this question.
                                    </Typography>
                                )}
                            </Paper>
                        </CardContent>
                    </Card>
                );
            })}
        </Container>
    );
};

SubmitTestWritingContent.propTypes = {
    testWritingList: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitTestWritingList: PropTypes.arrayOf(PropTypes.object),
    focusedSerial: PropTypes.number,
};

SubmitTestWritingContent.defaultProps = {
    submitTestWritingList: [],
    focusedSerial: null,
};

export default SubmitTestWritingContent;
