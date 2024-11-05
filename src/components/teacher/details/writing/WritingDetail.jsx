import { Grid2 } from "@mui/material";
import WritingInfo from "./WritingInfo";
import WritingTopic from "./WritingTopic";
import useWritingDetail from "./useWritingDetail";
import ErrorComponent from "shared/component/error/ErrorComponent";

export default function WritingDetail() {
  const {
    localData,
    setLocalData,
    isEditing,
    setIsEditing,
    error,
    setError,
    handleCloseError,
  } = useWritingDetail();
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
          setError={setError}
        />
      </Grid2>
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </Grid2>
  );
}
