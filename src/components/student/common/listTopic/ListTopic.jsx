import { Stack, Typography } from "@mui/material";
import MainPicture from "./MainPicture";
import ListContent from "./ListContent";
import CustomPagination from "shared/component/pagination/CustomPagination";
import "./ListTopic.css";
import useListTopic from "./useListTopic";

function ListTopic({ path, quote, title, bg }) {
  const { list, totalPage, onChangePage } = useListTopic(path);

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
