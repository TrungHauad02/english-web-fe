import { Stack, Typography } from "@mui/material";
import PDFViewer from "../../common/pdfViewer/PDFViewer";

function GrammarDocument({ file, title }) {
  return (
    <Stack direction={"column"} sx={{ marginX: "5%", marginY: "1rem" }} gap={2}>
      <Typography variant="h6" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {title} document
      </Typography>
      <PDFViewer file={file} title={title} />
    </Stack>
  );
}

export default GrammarDocument;
