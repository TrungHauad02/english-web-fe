import React, { useState } from "react";
import ListQuestion from "../common/ListQuestion";
import { Box, Typography, Paper, Container } from "@mui/material";

function Reading({ dataTest, onAnswerChange, focusId, title,answers,setAnswers }) {
    return (
        <Container sx={{ mt: 4 }}>
            {dataTest && dataTest.dataitem && Array.isArray(dataTest.dataitem) ? (
                dataTest.dataitem.map((item, index) => {
                    return (
                        <Box key={item.id} sx={{ mb: 4, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', }}>
                               Question {item?.questions?.[0]?.serial} - {item?.questions?.[item?.questions?.length-1]?.serial} 
                            </Typography>

                            {item.image  && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                    <img 
                                        src={item.image} 
                                        alt="" 
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                                    />
                                </Box>
                            )}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: '8px' }}>
                                    {item.content}
                                </Typography>
                            </Box>
                            <ListQuestion 
                                dataTest={item} 
                                onAnswerChange={onAnswerChange} 
                                focusId={focusId} 
                                title={title} 
                                answers = {answers} setAnswers = {setAnswers}
                            />
                        </Box>
                    );
                })
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No data available
                </Typography>
            )}
        </Container>
    );
}

export default Reading;
