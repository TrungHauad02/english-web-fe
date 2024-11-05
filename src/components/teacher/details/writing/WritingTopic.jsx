import { Grid2 } from "@mui/material";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import SaveEditDeleteButton from "../common/button/SaveEditDeleteButton";
import useWritingTopic from "./useWritingTopic";

export default function WritingTopic({
  data,
  setData,
  isEditing,
  setIsEditing,
  setError,
}) {
  const {
    handleEditing,
    handleSave,
    handleDelete,
    onChangeDescription,
    onChangeTopic,
  } = useWritingTopic(data, setData, isEditing, setIsEditing, setError);

  return (
    <Grid2
      container
      direction={"column"}
      spacing={4}
      sx={{ marginTop: "4.25rem" }}
    >
      <Grid2 container size={6} direction={"column"} sx={{ width: "70%" }}>
        <MultiLineTextField
          label={"Description"}
          value={data.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
        />
        <MultiLineTextField
          label={"Topic"}
          value={data.topic}
          onChange={onChangeTopic}
          disabled={!isEditing}
        />
        <Grid2 container direction={"row"} spacing={2}>
          <SaveEditDeleteButton
            showText
            onDel={handleDelete}
            onEdit={handleEditing}
            onSave={handleSave}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
