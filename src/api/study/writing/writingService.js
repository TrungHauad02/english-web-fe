import apiClient from "../../apiClient";

export async function getWritingDetail(id) {
  return {
    id: "-1",
    title: "Title",
    serial: 1,
    description: "This is description",
    topic: "Write about this topic",
    image: "/environment.png",
    status: "ACTIVE",
  };
  // try {
  //   const res = await apiClient.get(`/writings/${id}`);
  //   return res.data;
  // } catch (err) {
  //   console.error("Error fetching detail:", err);
  //   throw err;
  // }
}
