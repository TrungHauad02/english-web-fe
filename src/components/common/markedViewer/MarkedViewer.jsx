import { Download } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function MarkedViewer({ path, displayAppBar }) {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(path)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log(text);
        setData(marked(text));
      });
  }, [path]);

  return (
    <Box
      sx={{
        marginTop: "1rem",
        width: "100%",
        boxShadow: "0 0 0.5rem 0.1rem #00000020",
      }}
    >
      {displayAppBar && (
        <AppBar
          position="static"
          sx={{ width: "100%", background: "#D9D9D9", marginBottom: "1rem" }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="text"
              color="primary"
              startIcon={<Download />}
              component="a"
              href={path}
              download
              sx={{
                color: "#000",
                paddingLeft: "1rem",
              }}
            ></Button>
          </Toolbar>
        </AppBar>
      )}
      <article
        style={{
          padding: "1rem",
          fontSize: "1.25rem",
        }}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </Box>
  );
}
