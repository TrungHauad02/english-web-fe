import { useEffect, useState } from "react";
import { getListTopic } from "../../../api/teacher/listTopicService";
import { useNavigate } from "react-router-dom";

export default function useTopicList(title) {
  const [listTopic, setListTopic] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getListTopic(title, page, 10, "serial");

        const newContent = Array.isArray(data.content) ? data.content : [];
        setListTopic((prevList) => [...(prevList || []), ...newContent]);
        setDisplayList((prevList) => [...(prevList || []), ...newContent]);

        setTotalElements(data.totalElements);
      } catch (error) {
        console.error("Error loading topics:", error);
        setError(error.response?.data?.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    loadTopics();
  }, [title, page]);

  const handleCloseError = () => {
    setError(null);
  };

  function handleSearch(text) {
    const newList = listTopic.filter((topic) =>
      topic.title.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayList(newList);
  }

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  function handleAddNewTopic() {
    navigate(`-1`);
  }

  return {
    listTopic,
    displayList,
    handleSearch,
    handleLoadMore,
    isLoading,
    totalElements,
    handleAddNewTopic,
    error,
    handleCloseError,
  };
}
