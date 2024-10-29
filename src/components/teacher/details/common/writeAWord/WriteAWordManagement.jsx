import { Button, Stack, Typography } from "@mui/material";
import Question from "./Question";
import useWriteAWord from "./useWriteAWord";

export default function WriteAWordManagement() {
  const { data, handleAddNewQuestion, fetchData } = useWriteAWord();

  const headStyle = {
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    padding: "1rem 0",
    zIndex: 3,
    boxShadow: "0 0 0.5rem 0.1rem #00000050",
  };

  return (
    <Stack
      direction={"column"}
      sx={{ backgroundColor: "#f1f1f1", borderRadius: "0.5rem" }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} sx={headStyle}>
        <Typography
          variant="h4"
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{ marginX: "2rem" }}
        >
          Write A Word
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ paddingX: "1rem" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "capitalize",
            }}
            onClick={handleAddNewQuestion}
          >
            Add new question
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ padding: "1rem" }}>
        {data &&
          data.length !== 0 &&
          data.map((question) => (
            <Question key={question.id} data={question} fetchData={fetchData} />
          ))}
      </Stack>
    </Stack>
  );
}
