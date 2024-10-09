import { Stack, Typography } from "@mui/material";
import MainPicture from "./MainPicture";
import ListContent from "./ListContent";
import CustomPagination from "../../../common/pagination/CustomPagination";
import "./ListTopic.css";
import { getListTopic } from "../../../../api/student/listTopic";
import { useEffect, useState } from "react";

function ListTopic({ quote, title, bg }) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListTopic(page - 1);
      const topics = data.content;
      setTotalPage(data.totalPages);
      if (topics) {
        setList(topics);
      } else {
        setList([]);
      }
    };

    fetchData();
  }, [page]);
  const onChangePage = (event, value) => {
    setPage(value);
  };
  return (
    <Stack direction="column">
      <MainPicture src={bg} title={title} />
      <Stack direction={"column"}>
        <Typography
          variant="h5"
          component="p"
          sx={{ padding: "1rem", marginX: "5%", marginY: "1rem" }}
        >
          {quote}
        </Typography>
        <ListContent list={list} />
        <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
          <CustomPagination count={totalPage} onChange={onChangePage} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ListTopic;
