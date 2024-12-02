import { useEffect, useState } from "react";
import { getVocabById } from "api/study/topic/vocabularyService";

export default function useListVocabulary(listVocab, setCurVocab) {
  const [displayVocab, setDisplayVocab] = useState(listVocab);

  useEffect(() => {
    if (!listVocab) return;
    setDisplayVocab(listVocab);
  }, [listVocab]);

  function onHandleAddNewVocab() {
    setCurVocab({
      id: "-1",
      word: "",
      image: "",
      meaning: "",
      wordType: "NOUN",
      phonetic: "",
      example: "",
      status: "ACTIVE",
    });
  }

  function onUpdateCurVocab(id) {
    const fetchVocab = async () => {
      const data = await getVocabById(id);
      setCurVocab(data);
    };

    fetchVocab();
  }

  return {
    displayVocab,
    onHandleAddNewVocab,
    onUpdateCurVocab,
  };
}
