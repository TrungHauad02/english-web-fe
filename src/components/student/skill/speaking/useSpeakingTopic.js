import { getSpeakingDetail } from "api/study/speaking/speakingService";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { scoreWriting } from "api/feature/scoreWriting/scoreWriting";

export default function useSpeakingTopic() {
  const { id } = useParams();
  const [speaking, setSpeaking] = useState(null);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [timer, setTimer] = useState(0);
  const [textRecognize, setTextRecognize] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");
  const timerRef = useRef(null);

  const handleStartRecording = () => {
    setIsRecording((prevState) => !prevState);
    if (!isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) return prevTimer - 1;
          clearInterval(timerRef.current);
          handleStopRecording();
          return 0;
        });
      }, 1000);
    } else {
      handleStopRecording();
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    setTimer(speaking.timeLimit);
  };

  const handleStop = (recordedBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(recordedBlob.blob);
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      const audioURL = `data:audio/wav;base64,${base64Data}`;
      setAudioSrc(audioURL);
    };
  };

  const handleClearAudio = () => {
    setAudioSrc(null);
  };

  const handleSubmit = async () => {
    try {
      const data = await getSpeechToText(audioSrc);
      setTextRecognize(data.transcript);
      const dataScore = await scoreWriting(data.transcript, speaking.topic);
      setComment(dataScore.comment);
      setScore(dataScore.score);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpeakingDetail(id);
        setSpeaking(data);
        if (data && data.duration) {
          setTimer(data.duration);
        }
      } catch (err) {}
    };
    fetchData();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasMicPermission(true); // Đã có quyền
      })
      .catch(() => {
        setHasMicPermission(false); // Không có quyền
      })
      .finally(() => {
        setPermissionChecked(true); // Đã kiểm tra quyền
      });
  }, [id]);

  return {
    speaking,
    hasMicPermission,
    permissionChecked,
    isRecording,
    audioSrc,
    timer,
    handleStartRecording,
    handleStop,
    handleClearAudio,
    handleSubmit,
    textRecognize,
    comment,
    score,
  };
}
