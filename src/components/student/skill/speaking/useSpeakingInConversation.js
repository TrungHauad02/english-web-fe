import { scoreConversation } from "api/feature/scoreSpeaking/scoreConversation";
import { uploadFile } from "api/feature/uploadFile/uploadFileService";
import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSpeakingInConversation() {
  const [listConversation, setListConversation] = useState([]);
  const [person, setPerson] = useState([]);
  const [listPeople, setListPeople] = useState([]);
  const [isRecordingList, setIsRecordingList] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching data");
      }
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

  const handleSubmit = async () => {
    console.log("Submit");
    const userId = localStorage.getItem("userId");
    const uploadPromises = recordedAudio.map((audio, index) => {
      if (audio) {
        const fileName = `conversation${
          listConversation[index].id + userId
        }.wav`;
        return uploadFile("study/speaking/conversation", fileName, audio, "NO");
      }
      return Promise.resolve();
    });
    try {
      const results = await Promise.all(uploadPromises);
      console.log("All files uploaded successfully!:", results);

      const scorePromises = results.map((result, index) => {
        const audioProvided = result.url.replace("?alt=media", "");
        const scale = 100;
        const speakingConversationId = listConversation[index].id;

        return scoreConversation(speakingConversationId, scale, audioProvided);
      });
      const scoreResults = await Promise.all(scorePromises);
      console.log("All scores submitted successfully!", scoreResults);
    } catch (error) {
      console.error("Failed to upload some files", error);
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
    handleSubmit,
  };
}
