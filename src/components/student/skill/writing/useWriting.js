import { getWritingDetail } from "api/study/writing/writingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useWriting() {
  const [topic, setTopic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWritingDetail(id);
        setTopic(data);
      } catch (error) {
        toast.error("Error while fetching data");
      }
    };
    fetchData();
  }, [id]);

  return {
    topic,
  };
}
