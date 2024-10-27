import { useEffect, useState } from "react";
import { getVocabById } from "api/study/topic/vocabularyService";

export default function useListVocabulary(listVocab, setCurVocab, fetchData) {
  const [displayVocab, setDisplayVocab] = useState(listVocab);

  useEffect(() => {
    if (!listVocab) return;
    setDisplayVocab(listVocab);
  }, [listVocab]);

  function handleSearch(text) {
    const newList = listVocab.filter((vocab) =>
      vocab.word.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayVocab(newList);
  }

  function onHandleAddNewVocab() {
    setCurVocab({
      id: "-1",
      word: "",
      img: "",
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

  async function onReLoad() {
    try {
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  return {
    displayVocab,
    handleSearch,
    onHandleAddNewVocab,
    onUpdateCurVocab,
    onReLoad,
  };
}
