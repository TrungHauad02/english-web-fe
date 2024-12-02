import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { scoreConversation } from "api/feature/scoreSpeaking/scoreConversation";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSpeakingInConversation() {
  const [listConversation, setListConversation] = useState([]);
  const [person, setPerson] = useState("");
  const [listPeople, setListPeople] = useState([]);
  const [isRecordingList, setIsRecordingList] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState([]);
  const [results, setResults] = useState([]);
  const [isScoring, setIsScoring] = useState(false);
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

  const handleStartRecording = (index) => {
    if (index !== -1) {
      setIsRecordingList((prevState) =>
        prevState.map((rec, idx) => (idx === index ? !rec : rec))
      );
    }
  };

  const handleStop = (index, recordedBlob) => {
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
  const handleResetRecording = (index) => {
    if (index !== -1) {
      setRecordedAudio((prevState) =>
        prevState.map((audio, idx) => (idx === index ? null : audio))
      );
    }
  };

  const handleSubmit = async () => {
    try {
      if (!recordedAudio || recordedAudio.length === 0) {
        toast.warning("No recordings to process.");
        return;
      }
      setIsScoring(true);
      const newResults = [];

      for (let i = 0; i < recordedAudio.length; i++) {
        const audio = recordedAudio[i];
        const conversation = listConversation[i];

        if (audio && conversation) {
          try {
            const speechText = await getSpeechToText(audio);

            const scoreData = await scoreConversation(
              speechText.transcript,
              conversation.content
            );

            console.log(`Speech Text: ${speechText.transcript}`);
            console.log(`Real Text: ${conversation.content}`);
            console.log(`Score:`, scoreData);

            newResults.push({
              conversationId: conversation.id,
              realText: conversation.content,
              transcript: speechText.transcript,
              score: scoreData.score,
            });

            toast.success(`Successfully scored conversation`);
          } catch (error) {
            console.error(
              `Error processing conversation ID: ${conversation.id}`,
              error
            );
            toast.error(
              `Failed to process conversation ID: ${conversation.id}`
            );
          }
        } else if (!audio) {
          console.warn(
            `No audio recorded for conversation ID: ${conversation.id}`
          );
        }
      }
      setResults(newResults);
      setIsScoring(false);
    } catch (error) {
      console.error("Error during submission", error);
      toast.error("An error occurred during submission");
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
    results,
    isScoring,
  };
}
