import { Grid2 } from "@mui/material";
import VocabularyCard from "./VocabularyCard";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

function ListFlashcard({ list }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(list.length / itemsPerPage);

  const currentItems = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Grid2
      container
      spacing={2}
      justifyContent={"center"}
      direction={"column"}
      sx={{
        width: "100%",
        backgroundColor: "#D6F153",
        padding: "1rem 0",
      }}
    >
      <Grid2 container justifyContent={"space-evenly"} alignItems={"center"}>
        {currentItems.map((vocab) => (
          <Grid2 item xs={6} sm={4} key={vocab.id} size={3}>
            <VocabularyCard vocab={vocab} />
          </Grid2>
        ))}
      </Grid2>

      <Grid2
        container
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          marginY: "1rem",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Grid2>
    </Grid2>
  );
}

export default ListFlashcard;
