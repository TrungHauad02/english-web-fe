import { useCallback, useState } from "react";

export default function useWritingAboutTopic() {
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [comment, setComment] = useState("");

  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    setEssay(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, []);

  const handleSubmit = () => {
    setComment("This is the comment.");
  }

  return {
    essay,
    wordCount,
    handleEssayChange,
    handleSubmit,
    comment
  };
}
