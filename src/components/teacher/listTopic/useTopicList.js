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
  const [curTitle, setCurTitle] = useState(title);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopics = async () => {
      if (title !== curTitle) {
        setDisplayList([]);
        setPage(0);
        setCurTitle(title);
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await getListTopic(title, page, 10, "serial", nameSearch);

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
    if (nameSearch === text) return;
    setDisplayList([]);
    setNameSearch(text);
    return;
  }

  function handleLoadMore() {
    if (displayList.length >= totalElements) return;
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
