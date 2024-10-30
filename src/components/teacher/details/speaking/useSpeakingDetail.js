import { useParams } from "react-router-dom";
import { getConversationDetail } from "api/study/speaking/conversationService";
import { useState } from "react";

export default function useSpeakingDetail() {
  const { id } = useParams();

  const fakeData = ["John", "Dutch", "Mica", "Jenny", "Linda"];
  const [people, setPeople] = useState(fakeData);

  const conversationData = getConversationDetail(1) || [];
  const [conversation, setConversation] = useState(conversationData);

  return {
    people,
    setPeople,
    conversation,
    setConversation,
  };
}
