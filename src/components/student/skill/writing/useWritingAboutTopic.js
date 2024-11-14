import { scoreWriting } from "api/feature/scoreWriting/scoreWriting";
import { useCallback, useState } from "react";

export default function useWritingAboutTopic(topic) {
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");

  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    setEssay(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, []);

  const handleSubmit = async () => {
    const data = await scoreWriting(essay, topic);
    // const data = {
    //   score: "95/100",
    //   comment: "You did a great job!",
    // };
    setScore(data.score);
    setComment(data.comment);
  };

  return {
    essay,
    wordCount,
    handleEssayChange,
    handleSubmit,
    comment,
    score,
  };
}
