import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getVocabByTopicId } from "../../../../../api/teacher/topicService";
import { useParams } from "react-router-dom";

export default function useVocabularyManagement() {
  const [curVocab, setCurVocab] = useState({
    id: "-1",
    word: "",
    img: "",
    meaning: "",
    wordType: "noun",
    phonetic: "",
    example: "",
    status: "inactive",
  });

  const { id } = useParams();
  const [listVocab, setListVocab] = useState([
    {
      id: "-1",
      word: "",
      img: "",
      meaning: "",
      wordType: "noun",
      phonetic: "",
      example: "",
      status: "inactive",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const topicId = id;
      const data = await getVocabByTopicId(topicId);
      setListVocab(data);
    };
    fetchData();
  }, [id]);

  function onSaveVocab(newVocab, isDelete = false) {
    if (isDelete) {
      const newVocabList = listVocab.filter(
        (vocab) => vocab.id !== newVocab.id
      );
      setListVocab(newVocabList);
      setCurVocab({
        id: "-1",
        word: "",
        img: "",
        meaning: "",
        wordType: "noun",
        phonetic: "",
        example: "",
        status: "inactive",
      });
      return;
    }
    if (newVocab.id === "-1") {
      newVocab.id = uuidv4();
      setListVocab([...listVocab, newVocab]);
      setCurVocab(newVocab);
      return;
    }
    const newVocabList = listVocab.map((vocab) =>
      vocab.id === newVocab.id ? newVocab : vocab
    );
    setListVocab(newVocabList);
    setCurVocab(newVocab);
  }

  function onUpdateCurVocab(id) {
    if (id === "-1") {
      setCurVocab({
        id: "-1",
        word: "",
        img: "",
        meaning: "",
        wordType: "noun",
        phonetic: "",
        example: "",
        status: "inactive",
      });
      return;
    }
    const vocab = listVocab.find((vocab) => vocab.id === id);
    setCurVocab(vocab);
  }

  return { curVocab, listVocab, onSaveVocab, onUpdateCurVocab };
}
