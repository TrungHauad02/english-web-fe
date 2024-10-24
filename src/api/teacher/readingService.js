import apiClient from "../apiClient";

export async function getReadingDetail(id) {
  return {
    id: "-1",
    title: "Title",
    serial: 1,
    description: "Description",
    content: "/reading.md",
    image: "/image",
    status: "ACTIVE",
  };
  // try {
  //   const res = await apiClient.get(`/readings/${id}`);
  //   return res.data;
  // } catch (err) {
  //   console.error("Error fetching detail:", err);
  //   throw err;
  // }
}
