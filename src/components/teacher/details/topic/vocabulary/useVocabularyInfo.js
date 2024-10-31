import { useEffect, useState } from "react";
import {
  createVocab,
  deleteVocab,
  updateVocab,
} from "api/study/topic/vocabularyService";
import { useParams } from "react-router-dom";

export default function useVocabularyInfo(curVocab, setCurVocab, fetchData) {
  const { id } = useParams();
  const wordType = ["NOUN", "VERB", "ADJECTIVE", "ADVERB"];
  const status = ["ACTIVE", "INACTIVE"];
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (curVocab.id !== "-1") return;
    setIsEditing(curVocab.id === "-1");
  }, [curVocab]);

  function handleInputChange(fieldName) {
    return (event) => {
      try {
        if (!isEditing) return;
        const newValue =
          fieldName === "image"
            ? URL.createObjectURL(event.target.files[0])
            : event.target.value;
        setCurVocab({ ...curVocab, [fieldName]: newValue });
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
  }

  function handleCloseError() {
    setError(null);
  }

  function onHandleEdit() {
    setIsEditing(true);
  }

  function handleError(err) {
    if (err.response?.data?.details) {
      const details = err.response.data.details;
      const errorMessages = Object.values(details).filter(Boolean).join(".\n");
      setError(errorMessages);
    } else {
      setError("An unexpected error occurred.");
    }
  }

  async function onHandleDelete() {
    try {
      if (curVocab.id === "-1") {
        setError("Cannot delete vocabulary that doesn't exits yet");
        return;
      }
      await deleteVocab(curVocab.id);
      await fetchData();
      setCurVocab({
        id: "-1",
        word: "",
        image: "",
        meaning: "",
        wordType: "NOUN",
        phonetic: "",
        example: "",
        status: "ACTIVE",
      });
    } catch (err) {
      handleError(err);
    }
  }

  async function onHandleSave() {
    try {
      if (id === "-1") {
        setError(
          "Cannot create vocabulary. Please, create lesson and try again"
        );
        return;
      }
      const vocab = { ...curVocab, topicId: id };
      let newData = vocab;
      if (curVocab.id === "-1") {
        newData = await createVocab(vocab);
      } else {
        newData = await updateVocab(curVocab.id, vocab);
      }
      setCurVocab(newData);
      setIsEditing(false);
      await fetchData();
    } catch (err) {
      handleError(err);
    }
  }

  return {
    wordType,
    status,
    isEditing,
    onChangeImage: handleInputChange("image"),
    onChangeExample: handleInputChange("example"),
    onChangeWord: handleInputChange("word"),
    onChangeMeaning: handleInputChange("meaning"),
    onChangeWordType: handleInputChange("wordType"),
    onChangePhonetic: handleInputChange("phonetic"),
    onChangeStatus: handleInputChange("status"),
    onHandleEdit,
    onHandleDelete,
    onHandleSave,
    error,
    handleCloseError,
  };
}
