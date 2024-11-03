import { Grid2 } from "@mui/material";
import VocabularyCard from "./VocabularyCard";
import { useEffect, useState } from "react";
import CustomPagination from "shared/component/pagination/CustomPagination";
import { getVocabByPageAndTopicId } from "api/study/topic/vocabularyService";

function ListFlashcard({ topicId, setError }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVocabByPageAndTopicId(
          topicId,
          currentPage - 1,
          8,
          "ACTIVE"
        );
        if (data) {
          setList(data.content);
          setTotalPage(data.totalPages);
        } else {
          setList([]);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchData();
  }, [currentPage, topicId]);

  const onChangePage = (event, value) => {
    setCurrentPage(value);
  };
  if (list === null) return null;
  return (
    <Grid2
      container
      spacing={2}
      justifyContent={"center"}
      direction={"column"}
      sx={{
        width: "100%",
        background: "#f1f1f1",
        padding: "1rem 0",
      }}
    >
      <Grid2 container justifyContent={"space-evenly"} alignItems={"center"}>
        {list.map((vocab) => (
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
        <CustomPagination count={totalPage} onChange={onChangePage} />
      </Grid2>
    </Grid2>
  );
}

export default ListFlashcard;
