import React from "react";
import { Box, Typography } from "@mui/material";
import ListQuestion from "../common/ListQuestion";

function Listening({ dataTest, onAnswerChange, focusId, title ,answers,setAnswers}) {
    return (
        <>
            {dataTest.dataItem.map((item) => (
                <Box key={item.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        Question {item?.questions?.[0]?.serial} - {item?.questions?.[item?.questions?.length - 1]?.serial}
                    </Typography>
                    <audio controls style={{ width: '100%' }}>
                        <source src={item.content} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>

                    <ListQuestion 
                        dataTest={item} 
                        onAnswerChange={onAnswerChange} 
                        focusId={focusId} 
                        title={title} 
                        answers = {answers} setAnswers = {setAnswers}
                    />
                </Box>
            ))}
        </>
    );
}

export default Listening;
