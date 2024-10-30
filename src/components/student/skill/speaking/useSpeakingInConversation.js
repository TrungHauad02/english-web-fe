import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useSpeakingInConversation() {
  const [listConversation, setListConversation] = useState([]);
  const [person, setPerson] = useState([]);
  const [listPeople, setListPeople] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversationInSpeaking(id);
      const sortedData = (data || []).sort((a, b) => a.serial - b.serial);
      setListConversation(sortedData);
      const uniquePeople = [
        ...new Set((sortedData || []).map((line) => line.name)),
      ];
      setPerson(uniquePeople[0]);
      setListPeople(uniquePeople);
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    setPerson(event.target.value);
  };

  return {
    listConversation,
    person,
    listPeople,
    handleChange,
  };
}
