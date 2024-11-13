import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Typography, AppBar, Toolbar, Stack } from "@mui/material";
import { ArrowBack, ArrowForward, Download } from "@mui/icons-material";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { downloadFile } from "api/feature/uploadFile/uploadFileService";

// Set up the PDF worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ file, title, height = "100%" }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        if (file && file.startsWith("data:application/pdf;base64,")) {
          setFileUrl(file);
          return;
        }
        const data = await downloadFile(file);
        const uint8Array = new Uint8Array(data);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    };

    fetchFileData();
  }, [file]);

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
        {fileUrl && (
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            style={{ width: "100%", maxHeight: "200px", overflow: "hidden" }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        )}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          mb: 2,
          paddingBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          size="small"
        >
          Prev
        </Button>
        <Typography variant="body" component="span" fontSize={"1.25rem"}>
          {pageNumber} / {numPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForward />}
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          size="small"
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default PDFViewer;
