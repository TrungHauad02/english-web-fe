import { scoreWriting } from "api/feature/scoreWriting/scoreWriting";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function useWritingAboutTopic(topic) {
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const [isScoring, setIsScoring] = useState(false);

  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    setEssay(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsScoring(true);
      const data = await scoreWriting(essay, topic);
      setScore(data.score);
      setComment(data.comment);
      setIsScoring(false);
    } catch (error) {
      toast.error("Error while scoring");
    }
  };

  return {
    essay,
    wordCount,
    handleEssayChange,
    handleSubmit,
    comment,
    score,
    isScoring,
  };
}
