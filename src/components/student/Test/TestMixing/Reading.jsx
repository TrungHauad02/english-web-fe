import React from "react";
import ListQuestion from "../common/ListQuestion";
import { Box, Typography, Grid, styled } from "@mui/material";
import { Container } from "@mui/material";
import ImageWithLoading from "../common/ImageWithLoading";
const QuestionSection = styled(Grid)(({ theme }) => ({
  marginTop: "1rem",
  marginRight: "2%",
  flex: "0 1 47%",
  height: "auto",
}));
function Reading({
  dataTest,
  onAnswerChange,
  focusId,
  title,
  answers,
  setAnswers,
}) {
  return (
    <Container sx={{ mt: 4 }}>
      {dataTest && dataTest.dataItem && Array.isArray(dataTest.dataItem) ? (
        dataTest.dataItem.map((item, index) => {
          return (
            <Box
              key={item.id}
              sx={{
                mb: 4,
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Question {item?.questions?.[0]?.serial} -{" "}
                {item?.questions?.[item?.questions?.length - 1]?.serial}
              </Typography>

              <QuestionSection item>
                {item.image !== "" ? (
                  <>
                    <ImageWithLoading imageSrc={item.image} />
                    <Box sx={{ height: "300px", overflowY: "auto" }}>
                      <QuestionContent content={item.content} />
                    </Box>
                  </>
                ) : (
                  <Box sx={{ height: "300px", overflowY: "auto" }}>
                    <QuestionContent content={item.content} />
                  </Box>
                )}
              </QuestionSection>
              <ListQuestion
                dataTest={item}
                onAnswerChange={onAnswerChange}
                focusId={focusId}
                title={title}
                answers={answers}
                setAnswers={setAnswers}
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
const QuestionContent = ({ content }) => {
  const paragraphs = content.split("\n");

  return (
    <Box>
      {paragraphs.map((paragraph, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
};
export default Reading;
