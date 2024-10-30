import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteButton from "../common/button/DeleteButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useLine from "./useLine";

export default function Line({
  listPeople,
  line,
  disabled,
  conversation,
  setConversation,
  index,
}) {
  const { onChangeName, onChangeContent, onDeleteLine, moveUp, moveDown } =
    useLine(conversation, setConversation, index);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ paddingX: "0.25rem" }}
    >
      <FormControl sx={{ backgroundColor: "#fff", width: "8rem" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={line.name}
          onChange={onChangeName}
          disabled={disabled}
        >
          {(listPeople || [])
            .filter((option) => option !== "")
            .map((option) => (
              <MenuItem key={option} value={option}>
                <Typography textTransform={"initial"}>{option}</Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={3} alignItems="center" flexGrow={1}>
        <TextField
          value={line.content}
          onChange={onChangeContent}
          sx={{ backgroundColor: "#fff" }}
          disabled={disabled}
          fullWidth
        />
        <DeleteButton onDel={onDeleteLine} disabled={disabled} />
        <Stack direction="column" spacing={1}>
          <Button
            sx={{ color: "#000" }}
            disabled={disabled || index === 0}
            onClick={moveUp}
          >
            <ArrowUpwardIcon fontSize="0.5rem" />
          </Button>
          <Button
            sx={{ color: "#000" }}
            disabled={disabled || index === conversation.length - 1}
            onClick={moveDown}
          >
            <ArrowDownwardIcon fontSize="0.5rem" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
