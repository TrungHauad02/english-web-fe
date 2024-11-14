import { useEffect, useState } from "react";
import {
  createVocab,
  deleteVocab,
  getVocabById,
  updateVocab,
} from "api/study/topic/vocabularyService";
import { useParams } from "react-router-dom";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadImageUtils";

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
        if (fieldName === "image") {
          handleFileChange(event, (imageData) => {
            setCurVocab((prev) => ({ ...prev, image: imageData }));
          });
        } else {
          const newValue = event.target.value;
          setCurVocab((prev) => ({ ...prev, [fieldName]: newValue }));
        }
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
      setIsEditing(false);
      if (id === "-1") {
        setError(
          "Cannot create vocabulary. Please, create lesson and try again"
        );
        return;
      }

      // Prepare the vocabulary object with the current topic ID
      let vocab = { ...curVocab, topicId: id };
      let oldVocab = { image: "" };

      // Fetch existing vocabulary details if it is not new
      if (curVocab.id !== "-1") {
        const vocabDetail = await getVocabById(curVocab.id);
        oldVocab = vocabDetail ? vocabDetail : { image: "" };
      }

      // Handle image change and get the new image URL
      const newImage = await handleFileUpload(
        oldVocab.image,
        curVocab.image,
        curVocab.word,
        "study/topic/vocabulary"
      );

      // Update the vocabulary object with the new image if it has changed
      if (newImage !== oldVocab.image) {
        vocab = { ...vocab, image: newImage };
      }

      let newData = vocab;
      if (curVocab.id === "-1") {
        newData = await createVocab(vocab);
      } else {
        newData = await updateVocab(curVocab.id, vocab);
      }
      setCurVocab(newData);
      await fetchData();
    } catch (err) {
      console.log(err);
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
