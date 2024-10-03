import { useParams } from "react-router-dom";
import { getSpeakingDetail } from "../../../../api/teacher/detailManagerment";
import { Grid2 } from "@mui/material";
import WritingInfo from "./WritingInfo";
import { useState } from "react";
import WritingTopic from "./WritingTopic";

export default function WritingDetail() {
  const { id } = useParams();
  const data = getSpeakingDetail(id);
  const [localData, setLocalData] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Grid2 container direction={"row"} sx={{ margin: "2rem 1% 2rem 2%" }}>
      <Grid2 item size={5}>
        {/** Writing info*/}
        <WritingInfo
          data={localData}
          setData={setLocalData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid2>
      <Grid2 container size={7} direction={"column"} spacing={4}>
        <WritingTopic
          data={localData}
          setData={setLocalData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Grid2>
    </Grid2>
  );
}
