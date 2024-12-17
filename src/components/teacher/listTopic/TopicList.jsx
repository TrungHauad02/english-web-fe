import { Button, Grid2, Stack, Typography, Box } from "@mui/material";
import SearchBar from "shared/component/searchbar/SearchBar";
import TopicContent from "./TopicContent";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import useTopicList from "./useTopicList";
import ErrorComponent from "shared/component/error/ErrorComponent";

export default function TopicList({ title }) {
  const {
    displayList,
    handleSearch,
    handleLoadMore,
    isLoading,
    totalElements,
    handleAddNewTopic,
    error,
    handleCloseError,
  } = useTopicList(title);

  return (
    <Stack direction={"column"} spacing={4} sx={{ marginY: "2rem" }}>
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
      {/** Thanh tìm kiếm và nút thêm topic */}
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <Stack direction={"column"}>
          <SearchBar title={title} onHandleSearch={handleSearch} />
        </Stack>

        <Stack direction={"column"} spacing={2}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleAddNewTopic}
            sx={{
              backgroundColor: "#000",
              padding: "1rem 1.5rem",
              color: "#fff",
              textTransform: "capitalize",
            }}
          >
            Add new {title}
          </Button>
        </Stack>
      </Stack>
      {/**Bảng list topic */}
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          padding: "2rem",
          borderLeft: "1px solid #00000040",
          borderRight: "1px solid #00000040",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 item size={2}>
            <Typography variant={"h6"} textAlign={"center"}>
              Serial
            </Typography>
          </Grid2>
          <Grid2 item size={3}>
            <Typography variant={"h6"} textAlign={"center"}>
              Title
            </Typography>
          </Grid2>
          <Grid2 item size={3}>
            <Typography variant={"h6"} textAlign={"center"}>
              Image
            </Typography>
          </Grid2>
          <Grid2 item size={2}>
            <Typography variant={"h6"} textAlign={"center"}>
              Status
            </Typography>
          </Grid2>
          <Grid2 item size={2}>
            <Typography variant={"h6"} textAlign={"center"}>
              Details
            </Typography>
          </Grid2>
        </Grid2>
        {displayList &&
          displayList.map((topic) => (
            <Stack key={topic.id}>
              <TopicContent topic={topic} path={title} />
              <Divider />
            </Stack>
          ))}
        <Stack justifyContent="center" alignItems={"center"}>
          {displayList.length < totalElements && (
            <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "linear-gradient(135deg, #00796b, #48a999)",
                  padding: "0.8rem 2rem",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  borderRadius: "0.5rem",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #005f55, #3b9384)",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                  },
                  "&:active": {
                    background: "linear-gradient(135deg, #00473e, #2c796b)",
                    boxShadow: "inset 0px 4px 8px rgba(0, 0, 0, 0.2)",
                  },
                  "&:disabled": {
                    background: "#E0E0E0",
                    color: "#BDBDBD",
                    cursor: "not-allowed",
                  },
                }}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: "100%" }}
                  >
                    <CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
                    <span>Loading...</span>
                  </Stack>
                ) : (
                  "Load more"
                )}
              </Button>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
