import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Typography, AppBar, Toolbar, Stack } from "@mui/material";
import { ArrowBack, ArrowForward, Download  } from "@mui/icons-material";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set up the PDF worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ file, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <Stack
      spacing={1}
      sx={{
        height: "100%",
        margin: "1rem",
        maxWidth: "50%",
        overflow: "hidden",
        border: "1px solid #D9D9D9",
      }}
    >
      <AppBar position="static" sx={{ width: "100%", background: "#D9D9D9" }}>
        <Toolbar sx={{justifyContent:"space-between"}}>
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
          > 
          </Button>
        </Toolbar>
      </AppBar>
      <Stack
        direction="column"
        sx={{
          overflow: "hidden",
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
