import { useParams } from "react-router-dom";
import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { useEffect, useState } from "react";

export default function useSpeakingDetail() {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [people, setPeople] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversationInSpeaking(id);
      const sortedData = (data || []).sort((a, b) => a.serial - b.serial);
      setConversation(sortedData);
      const uniquePeople = [
        ...new Set((sortedData || []).map((line) => line.name)),
      ];
      setPeople(uniquePeople);
    };
    fetchData();
  }, [id]);

  return { people, setPeople, conversation, setConversation };
}
