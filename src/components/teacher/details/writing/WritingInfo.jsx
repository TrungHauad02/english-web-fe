import { Button, CardMedia, Grid2, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import { VisuallyHiddenInput } from "../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useWritingInfo from "./useWritingInfo";

export default function WritingInfo({ data, setData, isEditing }) {
  const { onChangeImage, onChangeTitle, onChangeSerial, onChangeStatus } =
    useWritingInfo(data, setData, isEditing);

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Listening Detail
      </Typography>
      <Grid2 container size={6} direction={"row"} sx={{ width: "100%" }}>
        <Grid2 container spacing={2} direction={"column"}>
          <CardMedia
            image={data.image}
            sx={{ height: "250px", width: "250px" }}
          />
          <Button
            component="label"
            role={undefined}
            variant="text"
            sx={{ color: "#828282", textTransform: "capitalize" }}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={!isEditing}
          >
            Change image
            <VisuallyHiddenInput
              type="file"
              multiple
              accept="image/*"
              onChange={onChangeImage}
            />
          </Button>
        </Grid2>
        <Grid2 container direction={"column"}>
          <BasicTextField
            label={"Title"}
            value={data.title}
            onChange={onChangeTitle}
            type="text"
            sx={{ minWidth: "250px" }}
            disabled={!isEditing}
            required
          />
          <BasicTextField
            label={"Serial"}
            value={data.serial}
            type="number"
            onChange={onChangeSerial}
            disabled={!isEditing}
            required
          />
          <BasicSelect
            label={"Status"}
            value={data.status}
            onChange={onChangeStatus}
            options={["ACTIVE", "INACTIVE"]}
            disabled={!isEditing}
            required
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
