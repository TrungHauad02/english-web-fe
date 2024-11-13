import {
  createWriteAWord,
  deleteWriteAWord,
  getWriteAWordById,
  updateWriteAWord,
} from "api/study/listening/writeAWordService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadImageUtils";

export default function useQuestion(data, fetchData) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

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

  function handleCloseError() {
    setError("");
  }

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleSave() {
    try {
      if (!isEditing) return;

      if (question.audioUrl === "") {
        setError("Audio URL cannot be empty");
        return;
      }

      let updatedQuestion = question;
      let oldQuestion = { audioUrl: "" };
      if (question.id !== "-1") {
        const questionDetail = await getWriteAWordById(question.id);
        oldQuestion = questionDetail ? questionDetail : { audioUrl: "" };
      }
      const newAudioUrl = await handleFileUpload(
        oldQuestion.audioUrl,
        question.audioUrl,
        id,
        "study/listening/write-a-word"
      );

      if (newAudioUrl !== question.audioUrl) {
        updatedQuestion = { ...question, audioUrl: newAudioUrl };
      }

      if (question.id === "-1") {
        await createWriteAWord(updatedQuestion);
      } else {
        await updateWriteAWord(question.id, updatedQuestion);
      }
      setIsEditing(false);
      fetchData();
    } catch (err) {
      handleError(err, setError);
    }
  }

  async function handleDelete() {
    try {
      if (!isEditing) return;
      if (question.id === "-1") return;
      await deleteWriteAWord(question.id);
      fetchData();
    } catch (err) {
      handleError(err, setError);
    }
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
    handleFileChange(e, (fileData) => {
      setQuestion((prevQuestion) => ({ ...prevQuestion, audioUrl: fileData }));
    });
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
    error,
    handleCloseError,
  };
}
