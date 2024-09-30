export function getGrammarDetail(id) {
  const data = {
    1: {
      id: 1,
      title: "Grammar Detail 1",
    },
    2: {
      id: 2,
      title: "Grammar Detail 2",
    },
    3: {
      id: 3,
      title: "Grammar Detail 3",
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
