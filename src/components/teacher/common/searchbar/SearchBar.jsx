import { Search } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ title, onHandleSearch, sx }) {
  const [searchText, setSearchText] = useState("");
  const complexSX = {
    ...sx,
    color: "#828282",
    background: "transparent",
    padding: "1rem 1.5rem",
    border: "1px solid #828282",
    boxShadow: "none",
  };
  return (
    <Stack direction={"row"} spacing={4}>
      <TextField
        label={`Search ${title}`}
        variant={"outlined"}
        sx={{ color: "#828282", width: "20rem" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        variant={"contained"}
        startIcon={<Search />}
        sx={complexSX}
        onClick={() => onHandleSearch(searchText)}
      >
        Search
      </Button>
    </Stack>
  );
}
