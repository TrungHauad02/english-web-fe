import { Card, Stack } from "@mui/material";
import PDFViewer from "shared/component/pdfViewer/PDFViewer";

const Image = (props) => (
  <img
    {...props}
    style={{
      width: "500px",
      height: "400px",
      objectFit: "cover",
    }}
    alt={props.alt || "Image description"}
  />
);

export default function ReadingContent({ topic }) {
  return (
    <Stack spacing={2} direction="row" sx={{ marginX: "5%", marginY: "1rem" }}>
      <Image src={topic.image} alt="reading" />
      <Card sx={{ width: "100%" }}>
        <PDFViewer title={topic.title} file={topic.file} />
      </Card>
    </Stack>
  );
}
