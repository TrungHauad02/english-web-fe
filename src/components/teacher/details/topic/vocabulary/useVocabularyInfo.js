import { useEffect, useState } from "react";

export default function useVocabularyInfo(curVocab, onSaveVocab) {
  const wordType = ["noun", "verb", "adjective", "adverb"];
  const status = ["active", "inactive"];
  const [isEditing, setIsEditing] = useState(false);
  const [localVocab, setLocalVocab] = useState(curVocab);

  useEffect(() => {
    setIsEditing(curVocab.id === "-1");
    setLocalVocab(curVocab);
  }, [curVocab]);

  function onChangeImage(e) {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalVocab({ ...localVocab, img: imageUrl });
    }
  }

  function onChangeExample(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, example: e.target.value });
  }

  function onChangeWord(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, word: e.target.value });
  }

  function onChangeMeaning(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, meaning: e.target.value });
  }

  function onChangeWordType(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, wordType: e.target.value });
  }

  function onChangePhonetic(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, phonetic: e.target.value });
  }

  function onChangeStatus(e) {
    if (!isEditing) return;
    setLocalVocab({ ...localVocab, status: e.target.value });
  }

  function onHandleEdit() {
    setIsEditing(true);
  }

  function onHandleDelete() {
    onSaveVocab(localVocab, true);
  }

  function onHandleSave() {
    setIsEditing(false);
    onSaveVocab(localVocab);
  }

  return {
    wordType,
    status,
    isEditing,
    localVocab,
    onChangeImage,
    onChangeExample,
    onChangeWord,
    onChangeMeaning,
    onChangeWordType,
    onChangePhonetic,
    onChangeStatus,
    onHandleEdit,
    onHandleDelete,
    onHandleSave,
  };
}
