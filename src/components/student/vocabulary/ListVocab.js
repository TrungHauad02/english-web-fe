const listVocab = [
  { id: "1", word: "Tree", img: "/environment.png", phonetic: "/tree/", example: "The tree is tall. Cái cây này cao", meaning: "Cây" },
  { id: "2", word: "Flower", img: "/environment.png", phonetic: "/flower/", example: "The flower is red.", meaning: "Bông hoa" },
  { id: "3", word: "Sun", img: "/environment.png", phonetic: "/sun/", example: "The sun is shining.", meaning: "Mặt trời" },
  { id: "4", word: "Cloud1", img: "/environment.png", phonetic: "/cloud/", example: "The cloud is white.", meaning: "Đám mây" },
  { id: "5", word: "Cloud2", img: "/environment.png", phonetic: "/cloud/", example: "The cloud is dark.", meaning: "Đám mây" },
  { id: "6", word: "Cloud3", img: "/environment.png", phonetic: "/cloud/", example: "The cloud is tall.", meaning: "Đám mây" },
  { id: "7", word: "Cloud4", img: "/environment.png", phonetic: "/cloud/", example: "The cloud is wide.", meaning: "Đám mây" },
  { id: "8", word: "Cloud5", img: "/environment.png", phonetic: "/cloud/", example: "The cloud is thin.", meaning: "Đám mây" }
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
