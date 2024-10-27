import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicDetail } from "api/study/topic/topicService";
import { getVocabByPageAndTopicId } from "api/study/topic/vocabularyService";
import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";

export default function useVocabulary() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [stateVocab, setStateVocab] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicData, vocabData, listQuestionData] = await Promise.all([
          getTopicDetail(id),
          getVocabByPageAndTopicId(id, 0, 24),
          getAnswerQuestions("topics", id),
        ]);
        setTopic(topicData);
        setListQuestion(listQuestionData);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
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
  return {
    topic,
    stateVocab,
    listQuestion,
  };
}
