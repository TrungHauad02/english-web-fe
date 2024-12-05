import {
  Grid2,
  Radio,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import DeleteButton from "../button/DeleteButton";

export default function Answer({
  data,
  isEditing,
  onChangeAnswerContent,
  onChangeCorrectAnswer,
  onDeleteAnswer,
  onChangeAnswerStatus,
}) {
  return (
    <Grid2 container direction={"row"} spacing={2} alignItems={"center"}>
      {/* Answer content */}
      <Grid2 item xs={12} sm={8} md={6} lg={5}>
        <TextField
          value={data.content}
          required
          disabled={!isEditing}
          onChange={(e) => onChangeAnswerContent(e, data.id)}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
            },
          }}
        />
      </Grid2>

      {/* Correct answer */}
      <Grid2 item xs={2} sm={1}>
        <Radio
          checked={data.correct}
          value={data.id}
          disabled={!isEditing}
          onChange={onChangeCorrectAnswer}
          sx={{
            color: data.correct ? "green" : "grey",
          }}
        />
      </Grid2>

      {/* Answer status */}
      <Grid2 item xs={2} sm={2}>
        <FormControl fullWidth size="small" disabled={!isEditing}>
          <InputLabel>Status</InputLabel>
          <Select
            value={data.status}
            onChange={onChangeAnswerStatus}
            label="Status"
            sx={{
              "& .MuiSelect-root": {
                fontSize: "0.85rem",
              },
            }}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">InActive</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      {/* Delete answer */}
      <Grid2
        item
        xs={2}
        sm={1}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <IconButton
          size="small"
          disabled={!isEditing}
          onClick={onDeleteAnswer}
          sx={{
            color: "red",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          <DeleteButton showText={false} size="small" />
        </IconButton>
      </Grid2>
    </Grid2>
  );
}
