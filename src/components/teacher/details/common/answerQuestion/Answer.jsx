import CustomTextField from "./CustomTextField";
import { Grid2, Radio } from "@mui/material";
import DeleteButton from "../button/DeleteButton";
import BasicSelect from "../select/BasicSelect";

export default function Answer({
  data,
  isEditing,
  onChangeAnswerContent,
  onChangeCorrectAnswer,
  onDeleteAnswer,
  onChangeAnswerStatus,
}) {
  return (
    <Grid2 container direction={"row"} spacing={1} alignItems={"center"}>
      {/* Answer content */}
      <CustomTextField
        value={data.content}
        minWidth={"22rem"}
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
      <Grid2 sx={{ marginTop: "-0.4rem" }}>
        <BasicSelect
          disabled={!isEditing}
          options={["ACTIVE", "INACTIVE"]}
          value={data.status}
          onChange={onChangeAnswerStatus}
          sx={{ minWidth: "6.8rem" }}
        />
      </Grid2>
      <DeleteButton
        size={"small"}
        showText={false}
        disabled={!isEditing}
        onDel={onDeleteAnswer}
      />
    </Grid2>
  );
}
