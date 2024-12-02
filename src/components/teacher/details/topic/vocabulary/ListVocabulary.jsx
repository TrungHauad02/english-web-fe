import { Button, Grid2, Typography } from "@mui/material";
import SearchBar from "shared/component/searchbar/SearchBar";
import Divider from "@mui/material/Divider";
import useListVocabulary from "./useListVocabulary";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ListVocabulary({
  listVocab,
  setCurVocab,
  fetchData,
  handleSearch,
  maxElement,
  handleShowMore,
  onReLoad,
}) {
  const { displayVocab, onHandleAddNewVocab, onUpdateCurVocab } =
    useListVocabulary(listVocab, setCurVocab, fetchData);

  return (
    <Grid2
      container
      direction={"column"}
      sx={{ padding: "1rem", width: "100%" }}
    >
      <Grid2 container direction={"row"} justifyContent={"space-between"}>
        <Grid2 item>
          <SearchBar
            title={"Vocabulary"}
            onHandleSearch={handleSearch}
            maxWidth="14rem"
          />
        </Grid2>
        <Grid2 item sx={{ marginTop: "0.5rem" }}>
          <Button
            sx={{
              color: "#000",
              marginX: "0.25rem",
              textTransform: "capitalize",
            }}
            onClick={onReLoad}
          >
            <RefreshIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "capitalize",
            }}
            onClick={onHandleAddNewVocab}
          >
            Add new vocabulary
          </Button>
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction={"column"}
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid2 container direction={"row"} sx={{ padding: "0.5rem" }}>
          <Grid2 item size={8}>
            <Typography
              variant={"h6"}
              fontWeight={"bold"}
              sx={{ paddingLeft: "5%" }}
            >
              Word
            </Typography>
          </Grid2>
          <Grid2 item size={4}>
            <Typography
              variant={"h6"}
              fontWeight={"bold"}
              textAlign={"center"}
              textTransform={"capitalize"}
            >
              Details
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2
          spacing={1}
          sx={{ height: "400px", overflowY: "auto", padding: "0.5rem" }}
        >
          {displayVocab &&
            displayVocab.length !== 0 &&
            displayVocab.map((vocab) => (
              <Grid2
                container
                direction={"column"}
                sx={{ width: "100%", maxHeight: "55px", marginY: "0.5rem" }}
              >
                <Grid2 key={vocab.id} container direction={"row"}>
                  <Grid2 item size={8} sx={{ paddingLeft: "5%" }}>
                    <Typography variant={"body1"}>{vocab.word}</Typography>
                  </Grid2>
                  <Grid2 item size={4} textAlign={"center"}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        textTransform: "capitalize",
                      }}
                      onClick={() => onUpdateCurVocab(vocab.id)}
                    >
                      Details
                    </Button>
                  </Grid2>
                </Grid2>
                <Divider />
              </Grid2>
            ))}
          {displayVocab &&
            displayVocab.length !== 0 &&
            displayVocab.length < maxElement && (
              <Grid2 container direction={"row"} justifyContent={"center"}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    textTransform: "capitalize",
                  }}
                  onClick={handleShowMore}
                >
                  Show more
                </Button>
              </Grid2>
            )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
