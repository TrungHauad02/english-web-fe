import { Card, Stack } from "@mui/material";
import MarkedViewer from "../../../common/markedViewer/MarkedViewer";

const Image = (props) => (
  <img
    {...props}
    style={{ width: "500px" }}
    alt={props.alt || "Image description"}
  />
);

export default function ReadingContent({ img, content }) {
  return (
    <Stack spacing={2} direction="row" sx={{ marginX: "5%", marginY: "1rem" }}>
      <Image src={img} alt="reading" />
      <Card sx={{ width: "100%" }}>
        <MarkedViewer path={content} />
      </Card>
    </Stack>
  );
}
