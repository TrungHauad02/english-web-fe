import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import Question from "./Question";
import useAnswerQuestion from "./useAnswerQuestion";
import ErrorComponent from "../../../../../shared/component/error/ErrorComponent";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function AnswerQuestionManagement({ path }) {
  const {
    localData,
    fetchData,
    handleAddNewQuestion,
    onDelQuestion,
    error,
    setError,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    isLoading,
  } = useAnswerQuestion(path);

  return (
    <Stack
      direction={"column"}
      sx={{
        backgroundColor: "#f1f1f1",
        borderRadius: "0.25rem",
        width: "100%",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "1rem 0",
          zIndex: 3,
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
        }}
      >
        <Typography
          variant="h4"
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{ marginX: "2rem" }}
        >
          Answer Question
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
      {/**Hiển thị khi đang loading */}
      {isLoading && (
        <Stack
          sx={{
            height: "100%",
            minHeight: "20rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="4rem" />
        </Stack>
      )}
      <Stack sx={{ padding: "1rem" }}>
        {/** Questions */}
        {localData &&
          localData.length !== 0 &&
          localData.map((question, index) => (
            <Question
              key={question.id}
              data={question}
              path={path}
              fetchData={fetchData}
              onDelQuestion={() => handleOpenDialog(question.id, index)}
              setError={setError}
            />
          ))}
      </Stack>
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={() => setError("")} />
      )}
      <ConfirmDialogV2
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={onDelQuestion}
        message="Are you sure you want to delete this question?"
      />
    </Stack>
  );
}
