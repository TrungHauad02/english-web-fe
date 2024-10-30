import { getWritingDetail } from "api/study/writing/writingService";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWritingAboutTopic() {
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [writing, setWriting] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWritingDetail(id);
      setWriting(data);
    };
    fetchData();
  }, [id]);

  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    setEssay(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, []);

  return {
    writing,
    essay,
    wordCount,
    handleEssayChange,
  };
}
