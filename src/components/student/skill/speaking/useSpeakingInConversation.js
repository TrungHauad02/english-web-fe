import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useSpeakingInConversation() {
  const [listConversation, setListConversation] = useState([]);
  const [person, setPerson] = useState([]);
  const [listPeople, setListPeople] = useState([]);
  const [isRecordingList, setIsRecordingList] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversationInSpeaking(id, "ACTIVE");
      const sortedData = (data || []).sort((a, b) => a.serial - b.serial);
      setListConversation(sortedData);

      const uniquePeople = [
        ...new Set((sortedData || []).map((line) => line.name)),
      ];
      setPerson(uniquePeople[0]);
      setListPeople(uniquePeople);

      setIsRecordingList(sortedData.map(() => false));
      setRecordedAudio(sortedData.map(() => null));
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    setPerson(event.target.value);
  };

  const handleStartRecording = (conversationId) => {
    const index = listConversation.findIndex(
      (conv) => conv.id === conversationId
    );
    if (index !== -1) {
      setIsRecordingList((prevState) =>
        prevState.map((rec, idx) => (idx === index ? !rec : rec))
      );
    }
  };

  const handleStop = (conversationId, recordedBlob) => {
    console.log("Stop recording", conversationId, recordedBlob);
    const index = listConversation.findIndex(
      (conv) => conv.id === conversationId
    );
    if (index !== -1) {
      const reader = new FileReader();
      reader.readAsDataURL(recordedBlob.blob);
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        const audioURL = `data:audio/wav;base64,${base64Data}`;
        setRecordedAudio((prevState) =>
          prevState.map((audio, idx) => (idx === index ? audioURL : audio))
        );
      };
      setIsRecordingList((prevState) =>
        prevState.map((rec, idx) => (idx === index ? false : rec))
      );
    }
  };
  const handleResetRecording = (conversationId) => {
    const index = listConversation.findIndex(
      (conv) => conv.id === conversationId
    );
    if (index !== -1) {
      setRecordedAudio((prevState) =>
        prevState.map((audio, idx) => (idx === index ? null : audio))
      );
    }
  };
  return {
    listConversation,
    person,
    listPeople,
    handleChange,
    handleStartRecording,
    handleStop,
    isRecordingList,
    recordedAudio,
    handleResetRecording,
  };
}
