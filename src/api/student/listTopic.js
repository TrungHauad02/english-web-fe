export function getListTopic(page) {
  return fetch(`http://localhost:8080/topics`, {
    method: "GET",
    params: {
      page: page,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}
