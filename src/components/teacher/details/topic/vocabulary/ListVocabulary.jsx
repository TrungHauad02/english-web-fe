import { Button, Grid2, Typography } from "@mui/material";
import SearchBar from "../../../common/searchbar/SearchBar";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";

export default function ListVocabulary({ listVocab, onUpdateCurVocab }) {
  const [displayVocab, setDisplayVocab] = useState(listVocab);

  useEffect(() => {
    setDisplayVocab(listVocab);
  }, [listVocab]);

  function handleSearch(text) {
    const newList = listVocab.filter((vocab) =>
      vocab.word.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayVocab(newList);
  }

  function onHandleAddNewVocab() {
    onUpdateCurVocab("-1");
  }

  return (
    <Grid2
      container
      direction={"column"}
      sx={{ padding: "1rem", width: "100%" }}
    >
      <Grid2 container direction={"row"} justifyContent={"space-between"}>
        <Grid2 item>
          <SearchBar title={"Vocabulary"} onHandleSearch={handleSearch} />
        </Grid2>
        <Grid2 item sx={{ marginTop: "0.5rem" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ACCD0A", color: "#000" }}
            onClick={onHandleAddNewVocab}
          >
            Add new vocabulary
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container direction={"column"} sx={{ marginTop: "1rem" }}>
        <Grid2 container direction={"row"} sx={{ padding: "0.5rem" }}>
          <Grid2 item size={8} sx={{ paddingLeft: "5%" }}>
            <Typography variant={"h6"} fontWeight={"bold"}>
              Word
            </Typography>
          </Grid2>
          <Grid2 item size={4}>
            <Typography variant={"h6"} fontWeight={"bold"} textAlign={"center"}>
              Details
            </Typography>
          </Grid2>
        </Grid2>
        {displayVocab.map((vocab) => (
          <>
            <Grid2
              key={vocab.id}
              container
              direction={"row"}
              sx={{
                padding: "0.5rem",
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              <Grid2 item size={8} sx={{ paddingLeft: "5%" }}>
                <Typography variant={"body1"}>{vocab.word}</Typography>
              </Grid2>
              <Grid2 item size={4} textAlign={"center"}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#000", color: "#fff" }}
                  onClick={() => onUpdateCurVocab(vocab.id)}
                >
                  Details
                </Button>
              </Grid2>
            </Grid2>
            <Divider />
          </>
        ))}
      </Grid2>
    </Grid2>
  );
}
