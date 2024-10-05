import { Grid2 } from "@mui/material";
import { useState } from "react";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import SaveEditDeleteButton from "../common/button/SaveEditDeleteButton";

export default function WritingTopic({
  data,
  setData,
  isEditing,
  setIsEditing,
}) {
  const [topic, setTopic] = useState(data);

  const hanleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(topic);
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeTopic = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, topic: e.target.value });
  };

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
          value={topic.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
        />
        <MultiLineTextField
          label={"Topic"}
          value={topic.topic}
          onChange={onChangeTopic}
          disabled={!isEditing}
        />
        <Grid2 container direction={"row"} spacing={2}>
          <SaveEditDeleteButton
            showText
            onedit={hanleEditing}
            onsave={handleSave}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
