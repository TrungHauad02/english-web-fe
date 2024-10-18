import { Grid2, Typography } from "@mui/material";
import ListVocabulary from "./ListVocabulary";
import { useState } from "react";
import VocabularyInfo from "./VocabularyInfo";
import { v4 as uuidv4 } from "uuid";

export default function VocabularyManagement() {
  const fakeData = [
    {
      id: "1",
      word: "Vocab 1",
      meaning: "Meaning 1",
      wordType: "noun",
      phonetic: "/ˈvɑː.kæb.jə.lər.i/",
      example: "Example 1",
      img: "https://via.placeholder.com/250",
      status: "active",
    },
    {
      id: "2",
      word: "Vocab 2",
      meaning: "Meaning 2",
      wordType: "verb",
      phonetic: "/ˈvɑː.kæb.jə.lər.i/",
      example: "Example 2",
      img: "https://via.placeholder.com/250",
      status: "inactive",
    },
    {
      id: "3",
      word: "Vocab 3",
      meaning: "Meaning 3",
      wordType: "adjective",
      phonetic: "/ˈvɑː.kæb.jə.lər.i/",
      example: "Example 3",
      img: "https://via.placeholder.com/250",
      status: "active",
    },
    {
      id: "4",
      word: "Vocab 4",
      meaning: "Meaning 4",
      wordType: "adverb",
      phonetic: "/ˈvɑː.kæb.jə.lər.i/",
      example: "Example 4",
      img: "https://via.placeholder.com/250",
      status: "inactive",
    },
  ];

  const [curVocab, setCurVocab] = useState({
    id: "-1",
    word: "",
    img: "",
    meaning: "",
    wordType: "noun",
    phonetic: "",
    example: "",
    status: "inactive",
  });

  const [listVocab, setListVocab] = useState(fakeData);

  function onSaveVocab(newVocab, isDelete = false) {
    if (isDelete) {
      const newVocabList = listVocab.filter(
        (vocab) => vocab.id !== newVocab.id
      );
      setListVocab(newVocabList);
      setCurVocab({
        id: "-1",
        word: "",
        img: "",
        meaning: "",
        wordType: "noun",
        phonetic: "",
        example: "",
        status: "inactive",
      });
      return;
    }
    if (newVocab.id === "-1") {
      newVocab.id = uuidv4();
      setListVocab([...listVocab, newVocab]);
      setCurVocab(newVocab);
      return;
    }
    const newVocabList = listVocab.map((vocab) =>
      vocab.id === newVocab.id ? newVocab : vocab
    );
    setListVocab(newVocabList);
    setCurVocab(newVocab);
  }

  function onUpdateCurVocab(id) {
    if (id === "-1") {
      setCurVocab({
        id: "-1",
        word: "",
        img: "",
        meaning: "",
        wordType: "noun",
        phonetic: "",
        example: "",
        status: "inactive",
      });
      return;
    }
    const vocab = listVocab.find((vocab) => vocab.id === id);
    setCurVocab(vocab);
  }

  return (
    <Grid2
      container
      direction={"column"}
      spacing={2}
      sx={{
        backgroundColor: "#f1f1f1",
        borderRadius: "0.5rem",
        padding: "1.5rem 2rem",
        marginTop: "2rem",
        boxShadow: "0 0 0.5rem 0.1rem #00000050",
      }}
    >
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
            onUpdateCurVocab={onUpdateCurVocab}
          />
        </Grid2>
        <Grid2 container size={6}>
          <VocabularyInfo curVocab={curVocab} onSaveVocab={onSaveVocab} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
