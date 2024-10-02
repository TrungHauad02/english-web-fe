export function getGrammarDetail(id) {
  const data = {
    1: {
      id: "1",
      serial: 1,
      content: "Grammar Content 1",
      example: "Grammar Example 1",
      title: "Grammar Detail 1",
      img: "/environment.png",
      file: "/PresentContinuousTense.pdf",
      status: "active",
    },
    2: {
      id: "2",
      serial: 2,
      content: "Grammar Content 2",
      example: "Grammar Example 2",
      title: "Grammar Detail 2",
      img: "/environment.png",
      file: "/PresentContinuousTense.pdf",
      status: "active",
    },
    3: {
      id: "3",
      serial: 3,
      content: "Grammar Content 3",
      example: "Grammar Example 3",
      title: "Grammar Detail 3",
      img: "/environment.png",
      file: "/PresentContinuousTense.pdf",
      status: "inactive",
    },
  };
  return data[id];
}

export function getTopicDetail(id) {
  const data = {
    1: {
      id: "1",
      serial: 1,
      title: "Topic Detail 1",
      img: "/environment.png",
      status: "active",
      description: "This is a description 1",
    },
    2: {
      id: "2",
      serial: 2,
      title: "Topic Detail 2",
      img: "/environment.png",
      status: "active",
      description: "This is a description 2",
    },
    3: {
      id: "3",
      serial: 3,
      title: "Topic Detail 3",
      img: "/environment.png",
      status: "inactive",
      description: "This is a description 3",
    },
  };
  return data[id];
}
