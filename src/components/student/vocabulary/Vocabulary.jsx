import React, { useState } from "react";
import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import Introduction from "./introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import MainPicture from "../common/listTopic/MainPicture";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import LoadingComponent from "../common/loadingPage/LoadingComponent";
import { Grid, Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import useVocabulary from "./useVocabulary";
import ErrorComponent from "shared/component/error/ErrorComponent";

function Vocabulary() {
  const { topic, stateVocab, listQuestion, error, setError, handleCloseError } = useVocabulary();
  const [showMatchImageWithWord, setShowMatchImageWithWord] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showAnswerQuestions, setShowAnswerQuestions] = useState(false);

  const buttonStyles = {
    margin: "1rem 2%",
    backgroundColor: "#f1f1f1",
    color: "#000",
    justifyContent: "space-between",
    display: "flex",
    width: "96%",
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    padding: "1rem 1.5rem",
  };

  const collapseStyles = {
    paddingX: "1.5rem",
  };

  if (error) {
    return <ErrorComponent errorMessage={error} onClose={handleCloseError} />;
  }

  if (!topic)
    return (
      <Grid
        sx={{
          marginY: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item>
          <LoadingComponent />
        </Grid>
      </Grid>
    );

  return (
    <>
      <MainPicture title={topic.title} src={topic.image} />

      <Button
        onClick={() => setShowMatchImageWithWord(!showMatchImageWithWord)}
        sx={buttonStyles}
      >
        Image And Word
        {showMatchImageWithWord ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={showMatchImageWithWord} timeout={{ enter: 1000, exit: 500 }} sx={collapseStyles}>
        <MatchImageWithWord stateVocab={stateVocab} />
      </Collapse>

      <Introduction />

      <Button
        onClick={() => setShowFlashcards(!showFlashcards)}
        sx={buttonStyles}
      >
        Flashcards
        {showFlashcards ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={showFlashcards} timeout={{ enter: 1000, exit: 500 }} sx={collapseStyles}>
        <ListFlashcard topicId={topic.id} setError={setError} />
      </Collapse>

      <Button
        onClick={() => setShowAnswerQuestions(!showAnswerQuestions)}
        sx={buttonStyles}
      >
        Answer Questions
        {showAnswerQuestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={showAnswerQuestions} timeout={{ enter: 1000, exit: 500 }} sx={collapseStyles}>
        <AnswerQuestion listQuestion={listQuestion} />
      </Collapse>

      {error && <ErrorComponent errorMessage={error} onClose={handleCloseError} />}
    </>
  );
}

export default Vocabulary;
