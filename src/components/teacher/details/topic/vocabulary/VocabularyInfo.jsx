import { Button, CardMedia, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MultiLineTextField from "../../common/textField/MultiLineTextField";
import BasicTextField from "../../common/textField/BasicTextField";
import BasicSelect from "../../common/select/BasicSelect";
import SaveEditDeleteButton from "../../common/button/SaveEditDeleteButton";
import { useEffect, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function VocabularyInfo({ curVocab, onSaveVocab }) {
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
  return (
    <Grid2 container direction={"column"} sx={{ width: "100%" }} spacing={2}>
      <Grid2 container direction={"row"} spacing={2}>
        <Grid2 container direction={"column"} size={6}>
          {/* Image Example */}
          <CardMedia
            image={localVocab.img}
            sx={{ height: "250px", width: "320px" }}
          />
          <Button
            component="label"
            variant="text"
            sx={{ color: "#828282" }}
            tabIndex={-1}
            disabled={!isEditing}
            startIcon={<CloudUploadIcon />}
          >
            Change image
            <VisuallyHiddenInput
              type="file"
              multiple
              accept="image/*"
              onChange={onChangeImage}
            />
          </Button>
          <MultiLineTextField
            value={localVocab.example}
            onChange={onChangeExample}
            label={"Example"}
            rows={5}
            disabled={!isEditing}
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid2>
        <Grid2 container direction={"column"} size={6}>
          {/* Word Meaning */}
          <BasicTextField
            label={"Word"}
            value={localVocab.word}
            onChange={onChangeWord}
            disabled={!isEditing}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicTextField
            label={"Meaning"}
            value={localVocab.meaning}
            onChange={onChangeMeaning}
            disabled={!isEditing}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicSelect
            label={"Word Type"}
            options={wordType}
            value={localVocab.wordType}
            onChange={onChangeWordType}
            disabled={!isEditing}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicTextField
            disabled={!isEditing}
            label={"Phonetic"}
            value={localVocab.phonetic}
            onChange={onChangePhonetic}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicSelect
            label={"Status"}
            options={status}
            value={localVocab.status}
            onChange={onChangeStatus}
            disabled={!isEditing}
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction={"row"}
        spacing={2}
        justifyContent={"flex-end"}
      >
        <SaveEditDeleteButton
          showText
          spacing={3}
          onedit={onHandleEdit}
          ondel={onHandleDelete}
          onsave={onHandleSave}
        />
      </Grid2>
    </Grid2>
  );
}
