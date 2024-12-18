import { useParams } from "react-router-dom";
import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { useEffect, useState } from "react";
import { getVoices } from "api/feature/tts/textToSpeech";

export default function useSpeakingDetail() {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [people, setPeople] = useState(null);
  const [voices, setVoices] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const voiceData = await getVoices();
      setVoices(voiceData);

      const uniquePeople = [
        ...new Set((voiceData || []).map((voice) => voice.name)),
      ];
      setPeople(uniquePeople);

      if (id === "-1") {
        setConversation([]);
        setLoading(false);
        return;
      }
      const data = await getConversationInSpeaking(id);
      const sortedData = (data || []).sort((a, b) => a.serial - b.serial);
      setConversation(sortedData);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleCloseError = () => {
    setError("");
  };

  return {
    people,
    voices,
    conversation,
    setConversation,
    error,
    setError,
    handleCloseError,
    loading,
  };
}
