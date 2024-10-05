import { Button, Grid2, Stack, Typography } from "@mui/material";
import SearchBar from "../common/searchbar/SearchBar";
import TopicContent from "./TopicContent";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function TopicList({ listTopic, title }) {
  const [displayList, setDisplayList] = useState(listTopic);

  function handleSearch(text) {
    const newList = listTopic.filter((topic) =>
      topic.title.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayList(newList);
  }

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
              backgroundColor: "#FFF4CC",
              padding: "1rem 1.5rem",
              color: "#000",
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
        {displayList.map((topic) => (
          <>
            <TopicContent key={topic.id} topic={topic} path={title} />
            <Divider />
          </>
        ))}
      </Stack>
    </Stack>
  );
}
