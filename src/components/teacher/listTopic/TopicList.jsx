import { Button, Grid2, Stack, Typography, Box } from "@mui/material";
import SearchBar from "../common/searchbar/SearchBar";
import TopicContent from "./TopicContent";
import Divider from "@mui/material/Divider";
import DotLoader from "../../../shared/component/loader/DotLoader";
import useTopicList from "./useTopicList";

export default function TopicList({ title }) {
  const {
    displayList,
    handleSearch,
    handleLoadMore,
    isLoading,
    listTopic,
    totalElements,
  } = useTopicList(title);

  return (
    <Stack direction={"column"} spacing={4} sx={{ marginY: "2rem" }}>
      <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
        <Stack direction={"column"}>
          <SearchBar title={title} onHandleSearch={handleSearch} />
        </Stack>

        <Stack direction={"column"} spacing={2}>
          <Button
            variant={"contained"}
            color={"primary"}
            sx={{
              backgroundColor: "#6EC2F7",
              padding: "1rem 1.5rem",
              color: "#fff",
            }}
          >
            Add new {title}
          </Button>
        </Stack>
      </Stack>
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
              <TopicContent topic={topic} />
              <Divider />
            </Stack>
          ))}
        <Stack justifyContent="center" alignItems={"center"}>
          {listTopic.length < totalElements && (
            <Box display="flex" justifyContent="center">
              <Button
                variant={"text"}
                sx={{
                  backgroundColor: "#ffffffff",
                  padding: "1rem 1.5rem",
                  color: "#6EC2F7",
                  fontSize: "1.05rem",
                  textDecoration: "underline",
                }}
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Stack justifyContent="center" alignItems={"center"}>
                    <DotLoader />
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
