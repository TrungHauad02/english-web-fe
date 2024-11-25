import { getSpeakingDetail } from "api/study/speaking/speakingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSpeaking() {
  const [topic, setTopic] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpeakingDetail(id);
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
