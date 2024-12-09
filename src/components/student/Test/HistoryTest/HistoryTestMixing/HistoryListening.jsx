import React, { useState } from "react";
import { Box, Typography, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HistoryListQuestion from "../common/HistoryListQuestion";

function SubmitListening({ dataTest, focusId }) {

    const [showTranscript, setShowTranscript] = useState({});

    const handleToggleTranscript = (id) => {
        setShowTranscript((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <>
            {dataTest.testListenings.map((item) => (
                <Box key={item.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', }}>
                    Question {item?.questions?.[0]?.serial} - {item?.questions?.[item?.questions?.length-1]?.serial} 
                </Typography>
                    <audio controls style={{ width: '100%' }}>
                        <source src={item.content} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    <Button
                        onClick={() => handleToggleTranscript(item.id)}
                        sx={{ mt: 1, color: 'primary.main', textTransform: 'none' }}
                        variant="text"
                        endIcon={showTranscript[item.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    >
                        {showTranscript[item.id] ? "Transcript" : "Transcript"}
                    </Button>
                    <Collapse in={showTranscript[item.id]}>
                        <Typography variant="body2" sx={{ ml: 2,mt: 1 }}>
                            {item.transcript ? item.transcript : "No transcript available."}
                        </Typography>
                    </Collapse>
                    <HistoryListQuestion 
                        dataTest={item.questions} 
                        focusId={focusId} 
                        dataSubmitTest={dataTest.submitTestListeningAnswers} 
                    />
                </Box>
            ))}
        </>
    );
}

export default SubmitListening;
