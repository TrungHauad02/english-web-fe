import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicDetail } from "../../../../api/teacher/topicService";

export default function useTopicDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopicDetail(id);
      setData(res);
    };
    fetchData();
  }, [id]);

  return {
    data,
  };
}
