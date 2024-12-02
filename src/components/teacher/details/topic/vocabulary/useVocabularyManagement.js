import { useEffect, useState } from "react";
import { searchVocabByPageAndTopicId } from "api/study/topic/vocabularyService";
import { useParams } from "react-router-dom";

export default function useVocabularyManagement(setError) {
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
  const [page, setPage] = useState(0);
  const [maxElement, setMaxElement] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    try {
      if (id === "-1") {
        setListVocab([]);
        return;
      }
      const data = await searchVocabByPageAndTopicId(id, page, 4, searchText);
      setMaxElement(data.totalElements);
      setListVocab((prev) => {
        return [...(prev || []), ...data.content];
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, page, searchText]);

  const handleSearch = async (text) => {
    setPage(0);
    setListVocab([]);
    if (text === "") {
      onReLoad();
      return;
    }
    setSearchText(text);
  };

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  const onReLoad = async () => {
    setPage(0);
    setListVocab([]);
    setSearchText("");
    await fetchData();
  };

  return {
    curVocab,
    setCurVocab,
    listVocab,
    fetchData,
    handleSearch,
    maxElement,
    handleShowMore,
    onReLoad,
  };
}
