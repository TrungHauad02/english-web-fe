import { Button, Grid2, TextField, Typography } from "@mui/material";
import SaveEditDeleteButton from "../button/SaveEditDeleteButton";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useQuestion from "./useQuestion";
import ErrorComponent from "shared/component/error/ErrorComponent";
import BasicSelect from "../select/BasicSelect";

const CustomTextField = ({
  value,
  onChange,
  maxWidth = "4rem",
  minWidth,
  disabled,
  type = "text",
  sx = {
    maxWidth: maxWidth,
    minWidth: minWidth,
    "& .MuiInputBase-root": { fontSize: "1rem", padding: "0" },
  },
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      variant="outlined"
      sx={sx}
    />
  );
};

export default function Question({ data, fetchData }) {
  const {
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
  } = useQuestion(data, fetchData);

  return (
    <Grid2 container direction="column" sx={{ marginY: "0.5rem" }}>
      <Grid2
        container
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
          zIndex: 2,
        }}
      >
        <Grid2 item>
          <Typography variant="h6" fontWeight={"bold"}>
            Question
          </Typography>
        </Grid2>
        <Grid2 item>
          <CustomTextField
            value={question.serial}
            type="number"
            disabled={!isEditing}
            onChange={(e) => onChangeSerial(e)}
          />
        </Grid2>
        <Grid2 item>
          <Typography fontWeight="bold">:</Typography>
        </Grid2>
        <Grid2 item>
          <CustomTextField
            required
            value={question.sentence}
            minWidth="20rem"
            disabled={!isEditing}
            onChange={(e) => onChangeSentence(e)}
          />
        </Grid2>
        <Grid2 item>
          <SaveEditDeleteButton
            onDel={handleDelete}
            onEdit={handleEdit}
            onSave={handleSave}
            showText={false}
            size={"small"}
          />
        </Grid2>
      </Grid2>

      <Grid2
        container
        direction={"column"}
        spacing={2}
        sx={{
          marginLeft: "1rem",
          marginRight: "0.5rem",
          backgroundColor: "#fff",
          padding: "1rem",
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
          borderRadius: "0 0 0.5rem 0.5rem",
          zIndex: 1,
        }}
      >
        <Grid2 container direction={"row"} alignItems="center">
          <Grid2 item>
            <Typography variant="h6" fontWeight={"bold"}>
              Missing Word Index:
            </Typography>
          </Grid2>
          <Grid2 item>
            <CustomTextField
              value={question.missingIndex}
              type="number"
              required
              disabled={!isEditing}
              onChange={(e) => onChangeWordIndex(e)}
            />
          </Grid2>
        </Grid2>

        <Grid2 container direction={"row"} alignItems="center" spacing={1}>
          <Grid2 item size={1}>
            <Typography variant="h6" fontWeight={"bold"}>
              Audio:
            </Typography>
          </Grid2>
          <Grid2 item size={8}>
            <SoundViewer audioSrc={question.audioUrl} />
          </Grid2>
          <Grid2 item size={3}>
            <Button
              component="label"
              role={undefined}
              variant="text"
              sx={{
                color: "#000",
                width: "fit-content",
                padding: "0.5rem 2rem",
                textTransform: "capitalize",
              }}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={!isEditing}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="audio/*"
                onChange={onChangeFile}
              />
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 container direction={"row"} spacing={4} alignItems="center">
          <Grid2 item>
            <Typography variant="h6" fontWeight={"bold"}>
              Correct Answer:
            </Typography>
          </Grid2>
          <Grid2 item>
            <CustomTextField
              minWidth="12rem"
              value={question.correctAnswer}
              disabled={!isEditing}
              onChange={(e) => onChangeField(e, "correctAnswer")}
              required
            />
          </Grid2>
          <Grid2 item sx={{ marginTop: "-0.65rem" }}>
            <BasicSelect
              disabled={!isEditing}
              value={question.status}
              options={["ACTIVE", "INACTIVE"]}
              onChange={(e) => onChangeField(e, "status")}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      {/**Hiển thị khi xảy ra lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </Grid2>
  );
}
