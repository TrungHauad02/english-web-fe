import { Stack, Typography, Box, CircularProgress } from "@mui/material";
import MainPicture from "./MainPicture";
import ListContent from "./ListContent";
import CustomPagination from "shared/component/pagination/CustomPagination";
import useListTopic from "./useListTopic";
import useColor from "shared/color/Color";
import "./ListTopic.css";

function ListTopic({ path, title, bg }) {
  const { list, totalPage, onChangePage, quote, author, isLoading } =
    useListTopic(path);
  const { Color1, Color2, Color3, Color4 } = useColor();

  return (
    <Stack direction="column">
      <MainPicture src={bg} title={title} />
      {isLoading ? (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ height: "50vh" }}
        >
          <CircularProgress size="3rem" />
        </Stack>
      ) : (
        <Stack direction={"column"}>
          <Box
            sx={{
              backgroundColor: Color1,
              padding: "2rem",
              marginX: "5%",
              marginY: "1rem",
              borderRadius: "1rem",
              boxShadow: `0px 4px 12px ${Color4}`,
              border: `2px solid ${Color2}`,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: Color2,
                fontWeight: "bold",
                marginBottom: "1rem",
                fontStyle: "italic",
              }}
            >
              "{quote}" - {author}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                color: Color3,
                fontSize: "1.2rem",
                fontWeight: "500",
                lineHeight: 1.6,
              }}
            >
              Keep learning, growing, and achieving your goals!
            </Typography>
          </Box>

          <ListContent list={list} />
          <Stack alignItems={"center"} sx={{ marginY: "1rem", width: "100%" }}>
            <CustomPagination count={totalPage} onChange={onChangePage} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default ListTopic;
