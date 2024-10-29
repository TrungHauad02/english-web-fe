import { getListeningDetail } from "api/study/listening/listeningService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useListening() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getListeningDetail(id);
      setTopic(data);
    };
    fetchData();
  }, [id]);

  return { topic };
}
