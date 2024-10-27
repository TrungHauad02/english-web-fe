import CustomTextField from "./CustomTextField";
import { Grid2, Radio } from "@mui/material";
import DeleteButton from "../button/DeleteButton";

export default function Answer({
  data,
  isEditing,
  onChangeAnswerContent,
  onChangeCorrectAnswer,
  onDeleteAnswer,
}) {
  return (
    <Grid2 container direction={"row"} spacing={1} alignItems={"center"}>
      {/* Answer content */}
      <CustomTextField
        value={data.content}
        minWidth={"28rem"}
        disabled={!isEditing}
        onChange={(e) => onChangeAnswerContent(e, data.id)}
      />
      {/* Correct answer */}
      <Radio
        checked={data.correct}
        value={data.id}
        disabled={!isEditing}
        onChange={onChangeCorrectAnswer}
      />
      {/* Delete answer */}
      <DeleteButton
        size={"small"}
        showText={false}
        disabled={!isEditing}
        onDel={onDeleteAnswer}
      />
    </Grid2>
  );
}
