import { Grid2, Typography } from "@mui/material";
import ListVocabulary from "./ListVocabulary";
import VocabularyInfo from "./VocabularyInfo";
import useVocabularyManagement from "./useVocabularyManagement";

export default function VocabularyManagement({ setError }) {
  const {
    curVocab,
    setCurVocab,
    listVocab,
    fetchData,
    handleSearch,
    maxElement,
    handleShowMore,
    onReLoad,
  } = useVocabularyManagement(setError);

  const containerStyle = {
    backgroundColor: "#f1f1f1",
    borderRadius: "0.5rem",
    padding: "1.5rem 2rem",
    marginTop: "2rem",
    boxShadow: "0 0 0.5rem 0.1rem #00000050",
  };

  return (
    <Grid2 container direction={"column"} spacing={2} sx={containerStyle}>
      <Typography variant={"h5"} fontWeight={"bold"}>
        Vocabulary Management
      </Typography>
      <Grid2 container direction={"row"}>
        <Grid2
          container
          size={6}
          sx={{ backgroundColor: "#fff", borderRadius: "0.5rem" }}
        >
          <ListVocabulary
            listVocab={listVocab}
            setCurVocab={setCurVocab}
            fetchData={fetchData}
            handleSearch={handleSearch}
            maxElement={maxElement}
            handleShowMore={handleShowMore}
            onReLoad={onReLoad}
          />
        </Grid2>
        <Grid2 container size={6}>
          <VocabularyInfo curVocab={curVocab} setCurVocab={setCurVocab} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
