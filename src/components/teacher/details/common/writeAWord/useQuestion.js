import {
  createWriteAWord,
  deleteWriteAWord,
  updateWriteAWord,
} from "api/study/listening/writeAWordService";
import { useEffect, useState } from "react";

export default function useQuestion(data, fetchData) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (data.id === "-1") {
      const words = data.sentence.split(" ");

      const index = data.missingIndex;
      if (index >= 0 && index <= words.length) {
        words.splice(index, 0, "___");
      } else {
        return;
      }
      const updatedSentence = words.join(" ");
      setQuestion({ ...data, sentence: updatedSentence });
    } else {
      setQuestion(data);
    }
  }, [data]);
  function handleEdit() {
    setIsEditing(true);
  }

  async function handleSave() {
    if (question.id === "-1") {
      await createWriteAWord(question);
    } else {
      await updateWriteAWord(question.id, question);
    }
    setIsEditing(false);
    fetchData();
  }

  async function handleDelete() {
    if (question.id === "-1") return;
    await deleteWriteAWord(question.id);
    fetchData();
  }

  function onChangeField(e, field) {
    if (!isEditing) return;
    setQuestion({ ...question, [field]: e.target.value });
  }

  function onChangeWordIndex(e) {
    if (!isEditing || e.target.value < 0) return;
    const index = e.target.value;
    const sentenceWithoutPlaceholder = question.sentence.replace("___", "");
    const words = sentenceWithoutPlaceholder.split(" ").filter(Boolean);

    if (index >= words.length + 1) {
      return;
    }

    words.splice(index, 0, "___");

    const updatedSentence = words.join(" ");

    setQuestion({
      ...question,
      sentence: updatedSentence,
      missingIndex: index,
    });
  }

  function onChangeSerial(e) {
    if (!isEditing || e.target.value < 1) return;
    setQuestion({ ...question, serial: e.target.value });
  }

  function onChangeSentence(e) {
    if (!isEditing || !e.target.value.includes("___")) return;
    setQuestion({ ...question, sentence: e.target.value });
  }

  function onChangeFile(e) {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setQuestion({ ...question, audioUrl: audioUrl });
    }
  }

  return {
    question,
    isEditing,
    handleEdit,
    handleSave,
    handleDelete,
    onChangeField,
    onChangeWordIndex,
    onChangeSerial,
    onChangeSentence,
    onChangeFile,
  };
}
