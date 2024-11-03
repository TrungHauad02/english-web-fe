import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicDetail } from "api/study/topic/topicService";

export default function useTopicDetail() {
  const emptyTopic = {
    id: "-1",
    serial: 1,
    title: "",
    image: "",
    description: "",
    status: "ACTIVE",
  };
  const { id } = useParams();
  const [data, setData] = useState(emptyTopic);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === "-1") {
          setData(emptyTopic);
          return;
        }
        const dataRes = await getTopicDetail(id);
        console.log(dataRes);
        setData(dataRes);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  const handleCloseError = () => {
    setError("");
  };

  return {
    data,
    error,
    setError,
    handleCloseError,
  };
}
