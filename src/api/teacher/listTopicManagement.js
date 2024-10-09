// Fake data
export function getListTopic(title) {
  ///axios.get(`/api/teacher/${title}`);
  const listTopic = {
    topic: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],
    grammar: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],
    reading: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],

    listening: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],

    writing: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],

    speaking: [
      {
        id: "1",
        serial: 1,
        title: "Topic 1",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "2",
        serial: 2,
        title: "Topic 2",
        image: "/environment.png",
        status: "active",
      },
      {
        id: "3",
        serial: 3,
        title: "Topic 3",
        image: "/environment.png",
        status: "inactive",
      },
      {
        id: "4",
        serial: 4,
        title: "Topic 4",
        image: "/environment.png",
        status: "inactive",
      },
    ],
  };

  return listTopic[title];
}
