import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Typography, AppBar, Toolbar, Stack } from "@mui/material";
import { ArrowBack, ArrowForward, Download } from "@mui/icons-material";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { he } from "date-fns/locale";

// Set up the PDF worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ file, title, height = "100%" }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const complexSx = {
    height: "100%",
    overflow: "auto",
    margin: "1rem",
    maxWidth: "100%",
    border: "1px solid #D9D9D9",
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <Stack spacing={1} sx={complexSx}>
      <AppBar position="static" sx={{ width: "100%", background: "#D9D9D9" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
            {title}
          </Typography>
          <Button
            variant="text"
            color="primary"
            startIcon={<Download />}
            component="a"
            href={file}
            download
            sx={{
              color: "#000",
              paddingLeft: "1rem",
            }}
          ></Button>
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        sx={{
          height: { height },
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          style={{ width: "100%", maxHeight: "200px", overflow: "hidden" }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", mb: 2, paddingBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          Prev
        </Button>
        <Typography variant="h6" component="span">
          Page {pageNumber} of {numPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default PDFViewer;
