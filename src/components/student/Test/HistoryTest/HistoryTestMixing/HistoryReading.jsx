import HistoryListQuestion from "../common/HistoryListQuestion";
import { Box, Typography, Paper, Container } from "@mui/material";
import ImageWithLoading from "../../common/ImageWithLoading"

function SubmitReading({ dataTest, focusId }) {
    return (
        <Container sx={{ mt: 4 }}>
            {dataTest.testReadings.map((item, index) => (
                <Paper key={item.id} elevation={3} sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
                         <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', }}>
                               Question {item?.questions?.[0]?.serial} - {item?.questions?.[item?.questions?.length-1]?.serial} 
                            </Typography>
                    {item.image && (
                    <ImageWithLoading imageSrc={item.image} />
                    )}

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body1" sx={{ backgroundColor: '#f9f9f9', p: 2, borderRadius: '8px' }}>
                            {item.content}
                        </Typography>
                    </Box>
                    <HistoryListQuestion 
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
