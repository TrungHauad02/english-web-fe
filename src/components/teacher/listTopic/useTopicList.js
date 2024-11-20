import { useEffect, useState } from "react";
import { getListTopic } from "api/study/listTopic/listTopicService";
import { useNavigate } from "react-router-dom";

export default function useTopicList(title) {
  const [displayList, setDisplayList] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [error, setError] = useState(null);
  const [nameSearch, setNameSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(nameSearch);
        const data = await getListTopic(title, page, 10, "serial", nameSearch);
        console.log(data);

        const newContent = Array.isArray(data.content) ? data.content : [];
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
  }, [title, page, nameSearch]);

  const handleCloseError = () => {
    setError(null);
  };

  function handleSearch(text) {
    setDisplayList([]);
    setNameSearch(text);
    return;
  }

  function handleLoadMore() {
    setPage((prevPage) => prevPage + 1);
  }

  function handleAddNewTopic() {
    navigate(`-1`);
  }

  return {
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
