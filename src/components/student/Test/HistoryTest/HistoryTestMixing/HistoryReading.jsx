import ListQuestion from "./HistoryListQuestion";
import { Box, Typography, Paper, Container } from "@mui/material";

function SubmitReading({ dataTest, focusId }) {
    return (
        <Container sx={{ mt: 4 }}>
            {dataTest.testReadings.map((item, index) => (
                <Paper key={item.id} elevation={3} sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
                         <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', }}>
                               Question {item?.questions?.[0]?.serial} - {item?.questions?.[item?.questions?.length-1]?.serial} 
                            </Typography>
                    {item.image && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <img 
                                src={item.image} 
                                alt="Reading content" 
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
                        dataTest={item.questions} 
                        focusId={focusId} 
                        dataSubmitTest={dataTest.submitTestReadingAnswers}
                    />
                </Paper>
            ))}
        </Container>
    );
}

export default SubmitReading;
