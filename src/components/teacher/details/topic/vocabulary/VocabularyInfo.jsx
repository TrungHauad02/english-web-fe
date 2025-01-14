import { Button, CardMedia, Grid2 } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MultiLineTextField from "../../common/textField/MultiLineTextField";
import BasicTextField from "../../common/textField/BasicTextField";
import BasicSelect from "../../common/select/BasicSelect";
import { VisuallyHiddenInput } from "../../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useVocabularyInfo from "./useVocabularyInfo";
import ErrorComponent from "../../../../../shared/component/error/ErrorComponent";
import EditButton from "../../common/button/EditButton";
import DeleteButton from "../../common/button/DeleteButton";
import SaveButton from "../../common/button/SaveButton";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function VocabularyInfo({ curVocab, setCurVocab }) {
  const {
    wordType,
    status,
    isEditing,
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
    error,
    handleCloseError,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
  } = useVocabularyInfo(curVocab, setCurVocab);

  return (
    <Grid2 container direction={"column"} sx={{ width: "100%" }} spacing={2}>
      <Grid2 container direction={"row"} spacing={2}>
        <Grid2 container direction={"column"} size={6}>
          {/* Image Example */}
          <CardMedia
            image={curVocab.image}
            sx={{ height: "250px", width: "320px" }}
          />
          <Button
            component="label"
            variant="text"
            sx={{ color: "#828282", textTransform: "capitalize" }}
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
            value={curVocab.example}
            onChange={onChangeExample}
            label={"Example"}
            rows={5}
            disabled={!isEditing}
            required={curVocab.id !== "-1"}
            sx={{ backgroundColor: "#fff" }}
          />
        </Grid2>
        <Grid2 container direction={"column"} size={6}>
          {/* Word Meaning */}
          <BasicTextField
            label={"Word"}
            value={curVocab.word}
            onChange={onChangeWord}
            disabled={!isEditing}
            required={curVocab.id !== "-1"}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicTextField
            label={"Meaning"}
            value={curVocab.meaning}
            onChange={onChangeMeaning}
            disabled={!isEditing}
            required={curVocab.id !== "-1"}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicSelect
            label={"Word Type"}
            options={wordType}
            value={curVocab.wordType}
            onChange={onChangeWordType}
            disabled={!isEditing}
            required={curVocab.id !== "-1"}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicTextField
            disabled={!isEditing}
            label={"Phonetic"}
            value={curVocab.phonetic}
            onChange={onChangePhonetic}
            required={curVocab.id !== "-1"}
            sx={{ backgroundColor: "#fff" }}
          />
          <BasicSelect
            label={"Status"}
            options={status}
            value={curVocab.status}
            onChange={onChangeStatus}
            disabled={!isEditing}
            required={curVocab.id !== "-1"}
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
        <EditButton onEdit={onHandleEdit} showText disabled={isEditing} />
        <DeleteButton onDel={handleOpenDialog} showText disabled={!isEditing} />
        <SaveButton onSave={onHandleSave} showText disabled={!isEditing} />
      </Grid2>
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
      <ConfirmDialogV2
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={onHandleDelete}
        message="Are you sure you want to delete this vocabulary?"
      />
    </Grid2>
  );
}
