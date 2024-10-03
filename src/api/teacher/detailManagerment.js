import { duration } from "@mui/material";

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

export function getReadingDetail(id) {
  const data = {
    1: {
      id: "1",
      serial: 1,
      description: "Reading Description 1",
      title: "Reading Detail 1",
      img: "/environment.png",
      file: "/reading.md",
      status: "active",
    },
    2: {
      id: "2",
      serial: 2,
      description: "Reading Description 2",
      title: "Reading Detail 2",
      img: "/environment.png",
      file: "/reading.md",
      status: "active",
    },
    3: {
      id: "3",
      serial: 3,
      description: "Reading Description 3",
      title: "Reading Detail 3",
      img: "/environment.png",
      file: "/reading.md",
      status: "inactive",
    },
  };
  return data[id];
}
export function getListeningDetail(id) {
  const data = {
    1: {
      id: "1",
      serial: 1,
      description: "Listening Description 1",
      title: "Listening Detail 1",
      img: "/environment.png",
      status: "active",
    },
    2: {
      id: "2",
      serial: 2,
      description: "Listening Description 2",
      title: "Listening Detail 2",
      img: "/environment.png",
      status: "active",
    },
    3: {
      id: "3",
      serial: 3,
      description: "Listening Description 3",
      title: "Listening Detail 3",
      img: "/environment.png",
      status: "inactive",
    },
  };
  return data[id];
}

export function getSpeakingDetail(id) {
  const data = {
    1: {
      id: "1",
      serial: 1,
      description: "Speaking Description 1",
      title: "Speaking Detail 1",
      topic: "Speaking Topic 1",
      duration: "200",
      img: "/environment.png",
      status: "active",
    },
    2: {
      id: "2",
      serial: 2,
      description: "Speaking Description 2",
      title: "Speaking Detail 2",
      topic: "Speaking Topic 1",
      duration: "400",
      img: "/environment.png",
      status: "active",
    },
    3: {
      id: "3",
      serial: 3,
      description: "Speaking Description 3",
      title: "Speaking Detail 3",
      topic: "Speaking Topic 1",
      duration: "300",
      img: "/environment.png",
      status: "inactive",
    },
  };
  return data[id];
}

export function getConversationDetail(id) {
  const data = {
    1: [
      {
        id: "1",
        serial: 1,
        name: "John",
        content: "Hello",
      },
      {
        id: "2",
        serial: 2,
        name: "Dutch",
        content: "Hi",
      },
      {
        id: "3",
        serial: 3,
        name: "Mica",
        content: "How are you?",
      },
      {
        id: "4",
        serial: 4,
        name: "Jenny",
        content: "I'm fine",
      },
      {
        id: "5",
        serial: 5,
        name: "Linda",
        content: "Goodbye",
      },
    ],
  };
  return data[id];
}
