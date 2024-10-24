import { Stack, Typography } from "@mui/material";
import MainPicture from "./MainPicture";
import ListContent from "./ListContent";
import CustomPagination from "../../../common/pagination/CustomPagination";
import "./ListTopic.css";
import { getListTopic } from "../../../../api/student/listTopicApi";
import { useEffect, useState } from "react";

function ListTopic({ path, quote, title, bg }) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListTopic(path, page - 1, 10);
        console.log(data);
        const topics = data.content;
        setTotalPage(data.totalPages);
        if (topics) {
          setList(topics);
        } else {
          setList([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);
  const onChangePage = (value) => {
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
