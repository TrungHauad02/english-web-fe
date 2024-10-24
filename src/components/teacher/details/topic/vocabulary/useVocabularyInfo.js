import { useEffect, useState } from "react";
import {
  createVocab,
  deleteVocab,
  updateVocab,
} from "../../../../../api/teacher/vocabularyService";
import { useParams } from "react-router-dom";

export default function useVocabularyInfo(curVocab, setCurVocab, fetchData) {
  const { id } = useParams();
  const wordType = ["NOUN", "VERB", "ADJECTIVE", "ADVERB"];
  const status = ["ACTIVE", "INACTIVE"];
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsEditing(curVocab.id === "-1");
  }, [curVocab]);

  function handleInputChange(field) {
    return (e) => {
      if (!isEditing) return;
      const value =
        field === "image"
          ? URL.createObjectURL(e.target.files[0])
          : e.target.value;
      setCurVocab({ ...curVocab, [field]: value });
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
      await deleteVocab(curVocab.id);
      await fetchData();
      setCurVocab({
        id: "-1",
        word: "",
        img: "",
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
      setIsEditing(false);
      const vocab = { ...curVocab, topicId: id };
      let newData = vocab;
      if (curVocab.id === "-1") {
        newData = await createVocab(vocab);
      } else {
        newData = await updateVocab(vocab);
      }
      setCurVocab(newData);
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
