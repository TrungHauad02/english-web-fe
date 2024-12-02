import { getSpeakingDetail } from "api/study/speaking/speakingService";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { scoreWriting } from "api/feature/scoreWriting/scoreWriting";
import { toast } from "react-toastify";

export default function useSpeakingTopic() {
  const { id } = useParams();
  const [speaking, setSpeaking] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [textRecognize, setTextRecognize] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const [isScoring, setIsScoring] = useState(false);
  const timerRef = useRef(null);

  const [permission, setPermission] = useState(false);
  // holds the data from creating a new MediaRecorder object, given a MediaStream to record
  const mediaRecorder = useRef(null);
  // sets the current recording status of the recorder. The three possible values are
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  // contains encoded pieces (chunks) of the audio recording
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mimeType = "audio/wav";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpeakingDetail(id);
        setSpeaking(data);
        if (data && data.duration) {
          setTimer(data.duration);
        }
      } catch (err) {
        toast.error("Error while fetching data");
      }
    };
    fetchData();
  }, [id]);

  const handleClearAudio = () => {
    setIsRecording(false);
    setTimer(speaking.duration);
    setAudio("");
    setComment("");
    setTextRecognize("");
    setScore("");
  };

  const handleSubmit = async () => {
    try {
      setIsScoring(true);
      const data = await getSpeechToText(audio);
      setTextRecognize(data.transcript);
      const dataScore = await scoreWriting(data.transcript, speaking.topic);
      setComment(dataScore.comment);
      setScore(dataScore.score);
      setIsScoring(false);
    } catch (err) {
      toast.error("Error while scoring");
    }
  };

  const startRecording = async () => {
    if (audio) {
      setAudio("");
    }
    setRecordingStatus("recording");
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) return prevTimer - 1;
        clearInterval(timerRef.current);
        stopRecording();
        return 0;
      });
    }, 1000);
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        const audioURL = `data:audio/wav;base64,${base64Data}`;
        setAudio(audioURL);
      };
      //creates a playable URL from the blob file.
      // const audioUrl = URL.createObjectURL(audioBlob);
      // setAudio(audioUrl);
      setAudioChunks([]);
      clearInterval(timerRef.current);
      setTimer(speaking.duration);
    };
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
    speaking,
    isRecording,
    timer,
    textRecognize,
    comment,
    score,
    isScoring,
    permission,
    recordingStatus,
    audio,
    handleClearAudio,
    handleSubmit,
    startRecording,
    stopRecording,
    getMicrophonePermission,
  };
}
