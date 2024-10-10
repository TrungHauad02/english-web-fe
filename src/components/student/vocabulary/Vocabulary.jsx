import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import Introduction from "./introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import MainPicture from "../common/listTopic/MainPicture";
import AnswerQuestion from "../common/answerquestion/AnswerQuestion";
import { listQuestion } from "./ListQuestion";
import { useEffect, useState } from "react";
import { getVocabularyInTopic } from "../../../api/student/vocabularyApi";
import { getTopicById } from "../../../api/student/listTopicApi";
import { useParams } from "react-router-dom";
import LoadingComponent from "../common/loadingPage/LoadingComponent";
import { Grid2 } from "@mui/material";

function Vocabulary() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [stateVocab, setStateVocab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicData, vocabData] = await Promise.all([
          getTopicById(id),
          getVocabularyInTopic(0, 24, id),
        ]);
        setTopic(topicData);
        if (vocabData.content.length > 0) {
          const stateVocab = {
            listVocab: vocabData.content,
            listVocabOrder: vocabData.content.map((item) => item.id),
            listContainer: vocabData.content.reduce((acc, item) => {
              acc[item.id] = { id: item.id, contain: null };
              return acc;
            }, {}),
          };
          setStateVocab(stateVocab);
          console.log("stateVocab", stateVocab);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* Render ->
    const listVocabOrder = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const listContainer = {
        "1": { id: "1", contain: null },
        "2": { id: "2", contain: null },
    };
  */
  if (loading)
    return (
      <Grid2
        sx={{
          marginY: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid2 item>
          <LoadingComponent />
        </Grid2>
      </Grid2>
    );
  return (
    <>
      <MainPicture title={topic.title} src={topic.image} />
      <MatchImageWithWord stateVocab={stateVocab} />
      <Introduction title={topic.title} />
      <ListFlashcard topicId={id} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}

export default Vocabulary;
