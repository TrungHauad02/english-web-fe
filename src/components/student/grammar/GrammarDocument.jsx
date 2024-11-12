import { Stack, Typography } from "@mui/material";
import PDFViewer from "shared/component/pdfViewer/PDFViewer";

function GrammarDocument({ file, title }) {
  return (
    <Stack direction={"column"} sx={{ marginX: "5%", marginY: "1rem" }} gap={2}>
      <Stack sx={{ width: "60%" }}>
        <PDFViewer file={file} title={title} />
      </Stack>
    </Stack>
  );
}

export default GrammarDocument;
