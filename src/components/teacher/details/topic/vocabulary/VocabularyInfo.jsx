import { Button, CardMedia, Grid2 } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MultiLineTextField from "../../common/textField/MultiLineTextField";
import BasicTextField from "../../common/textField/BasicTextField";
import BasicSelect from "../../common/select/BasicSelect";
import SaveEditDeleteButton from "../../common/button/SaveEditDeleteButton";
import { VisuallyHiddenInput } from "../../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useVocabularyInfo from "./useVocabularyInfo";

export default function VocabularyInfo({ curVocab, onSaveVocab }) {
  const {
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
  } = useVocabularyInfo(curVocab, onSaveVocab);

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
          onEdit={onHandleEdit}
          onDel={onHandleDelete}
          onSave={onHandleSave}
        />
      </Grid2>
    </Grid2>
  );
}
