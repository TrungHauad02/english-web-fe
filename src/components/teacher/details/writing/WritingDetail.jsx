import { Grid2 } from "@mui/material";
import WritingInfo from "./WritingInfo";
import WritingTopic from "./WritingTopic";
import useWritingDetail from "./useWritingDetail";

export default function WritingDetail() {
  const { localData, setLocalData, isEditing, setIsEditing } =
    useWritingDetail();
  if (!localData) return <></>;
  return (
    <Grid2 container direction={"row"} sx={{ margin: "2rem 1% 2rem 2%" }}>
      <Grid2 item size={5}>
        {/** Writing info*/}
        <WritingInfo
          data={localData}
          setData={setLocalData}
          isEditing={isEditing}
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
