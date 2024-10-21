import { useEffect, useState } from "react";
import { getVocabByTopicId } from "../../../../../api/teacher/vocabularyService";
import { useParams } from "react-router-dom";

export default function useVocabularyManagement() {
  const emptyVocab = {
    id: "-1",
    word: "",
    img: "",
    meaning: "",
    wordType: "NOUN",
    phonetic: "",
    example: "",
    status: "INACTIVE",
  };

  const [curVocab, setCurVocab] = useState(emptyVocab);
  const { id } = useParams();
  const [listVocab, setListVocab] = useState(null);

  const fetchData = async () => {
    if (id === "-1") {
      setListVocab([]);
      return;
    }
    const data = await getVocabByTopicId(id);
    setListVocab(data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { curVocab, setCurVocab, listVocab, fetchData };
}
