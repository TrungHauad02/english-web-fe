import { Box } from "@mui/material";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function MarkedViewer({ path }) {
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
    <Box sx={{ margin: "1rem" }}>
      <article dangerouslySetInnerHTML={{ __html: data }} />
    </Box>
  );
}
