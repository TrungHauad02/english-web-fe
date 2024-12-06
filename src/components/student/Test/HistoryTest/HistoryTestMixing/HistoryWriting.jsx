import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Container,
    Paper,
    Box,
    Collapse,
    Button,
    Divider,
    TextField,
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

    const calculateWordCount = (text) => (text.trim() === '' ? 0 : text.trim().split(/\s+/).length);

    return (
        <Container>
            {(testWritingList || []).map((test, index) => {
                const relatedSubmit = (submitTestWritingList || []).find(
                    (submit) => submit.testWritingId === test.id
                );

                return (
                    <Box
                        key={index}
                        ref={(el) => (questionRefs.current[test.serial] = el)}
                        sx={{
                            mb: 3,
                            p: 2,
                            backgroundColor: test.serial === highlightedSerial ? '#e3f2fd' : '#ffffff',
                            transition: 'background-color 0.3s ease',
                            borderRadius: 1,
                            border: '1px solid #e0e0e0',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Question {test.serial}: {test.content || 'No content available'}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        {relatedSubmit ? (
                            <Box>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    <strong>Your Answer:</strong>
                                </Typography>
                                <Paper elevation={3} sx={{ mb: 2, p: 2 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        value={relatedSubmit.content || 'No answer provided'}
                                        InputProps={{ readOnly: true }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'rgba(0, 0, 0, 0.23)',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'rgba(0, 0, 0, 0.5)',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'primary.main',
                                                },
                                            },
                                        }}
                                    />
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="body2">
                                            Words Count: {calculateWordCount(relatedSubmit.content || '')}
                                        </Typography>
                                    </Box>
                                </Paper>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => toggleComment(test.serial)}
                                    sx={{ color: '#42a5f5', textTransform: 'none' }}
                                    endIcon={
                                        showComment === test.serial ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )
                                    }
                                >
                                    Comment
                                </Button>
                                <Collapse in={showComment === test.serial}>
                                    <Typography
                                        variant="body2"
                                        sx={{ ml: 2, mt: 1, color: '#616161' }}
                                    >
                                        <strong>Comment:</strong>{' '}
                                        {relatedSubmit.comment || 'No comment provided'}
                                    </Typography>
                                </Collapse>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="error">
                                No answer for this question.
                            </Typography>
                        )}
                    </Box>
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
