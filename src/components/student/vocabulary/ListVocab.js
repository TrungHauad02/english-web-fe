const listVocab = [
  { id: "1", word: "Tree", img: "/environment.png" },
  { id: "2", word: "Flower", img: "/environment.png" },
  { id: "3", word: "Sun", img: "/environment.png" },
  { id: "4", word: "Cloud1", img: "/environment.png" },
  { id: "5", word: "Cloud2", img: "/environment.png" },
  { id: "6", word: "Cloud3", img: "/environment.png" },
  { id: "7", word: "Cloud4", img: "/environment.png" },
  { id: "8", word: "Cloud5", img: "/environment.png" }
];

const stateVocab = {
  listVocab: listVocab,
  listVocabOrder: listVocab.map(item => item.id),
  listContainer: listVocab.reduce((acc, item) => {
      acc[item.id] = { id: item.id, contain: null };
      return acc;
  }, {})
};

/* Render ->
  const listVocabOrder = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const listContainer = {
      "1": { id: "1", contain: null },
      "2": { id: "2", contain: null },
      // các mục khác...
  };
*/

export default listVocab;
export { stateVocab };
