import { getConversationInSpeaking } from "api/study/speaking/conversationService";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { scoreConversation } from "api/feature/scoreSpeaking/scoreConversation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSpeakingInConversation() {
  const [listConversation, setListConversation] = useState([]);
  const [person, setPerson] = useState("");
  const [listPeople, setListPeople] = useState([]);
  const [results, setResults] = useState([]);
  const [isScoring, setIsScoring] = useState(false);
  const { id } = useParams();

  const [permission, setPermission] = useState(false);
  // holds the data from creating a new MediaRecorder object, given a MediaStream to record
  const mediaRecorder = useRef(null);
  // sets the current recording status of the recorder. The three possible values are
  const [recordingStatus, setRecordingStatus] = useState([]);
  const [stream, setStream] = useState(null);
  // contains encoded pieces (chunks) of the audio recording
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState([]);
  const mimeType = "audio/wav";

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

        setRecordedAudio(sortedData.map(() => ""));
        setRecordingStatus(sortedData.map(() => "inactive"));
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching data");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event) => {
    if (recordingStatus.includes("recording")) {
      toast.warning("Cannot change person while recording.");
      return;
    }
    setPerson(event.target.value);
  };

  const handleStart = (index) => {
    if (recordingStatus.includes("recording")) {
      toast.warning("Cannot record more than one conversation at a time.");
      return;
    }
    if (recordedAudio[index]) {
      setRecordedAudio((prevAudio) => [
        ...prevAudio.slice(0, index),
        "",
        ...prevAudio.slice(index + 1),
      ]);
    }

    setRecordingStatus((prevStatus) => [
      ...prevStatus.slice(0, index),
      "recording",
      ...prevStatus.slice(index + 1),
    ]);
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const handleStop = (index) => {
    setRecordingStatus((prevStatus) => [
      ...prevStatus.slice(0, index),
      "inactive",
      ...prevStatus.slice(index + 1),
    ]);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        const audioURL = `data:audio/wav;base64,${base64Data}`;
        setRecordedAudio((prevAudio) => [
          ...prevAudio.slice(0, index),
          audioURL,
          ...prevAudio.slice(index + 1),
        ]);
      };
      setAudioChunks([]);
    };
  };

  const handleReset = (index) => {
    setRecordingStatus((prevStatus) => [
      ...prevStatus.slice(0, index),
      "inactive",
      ...prevStatus.slice(index + 1),
    ]);
    setAudioChunks([]);
    setRecordedAudio((prevAudio) => [
      ...prevAudio.slice(0, index),
      "",
      ...prevAudio.slice(index + 1),
    ]);
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

        if (audio && conversation && person === conversation.name) {
          try {
            const speechText = await getSpeechToText(audio);

            const scoreData = await scoreConversation(
              speechText.transcript === ""
                ? "No transcript found"
                : speechText.transcript,
              conversation.content
            );

            console.log(`Speech Text: ${speechText.transcript}`);
            console.log(`Real Text: ${conversation.content}`);
            console.log(`Score:`, scoreData);

            newResults.push({
              conversationId: conversation.id,
              realText: conversation.name + ": " + conversation.content,
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

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("The MediaRecorder API is not supported in your browser.");
    }
  };

  return {
    listConversation,
    person,
    listPeople,
    recordingStatus,
    recordedAudio,
    isScoring,
    results,
    permission,
    handleChange,
    handleStart,
    handleStop,
    handleReset,
    handleSubmit,
    getMicrophonePermission,
  };
}
