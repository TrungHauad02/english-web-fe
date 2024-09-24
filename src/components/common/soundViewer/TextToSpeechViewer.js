import React, { useState, useEffect } from "react";
import SoundViewer from "./SoundViewer";
import { handleTextToSpeech } from "../../../api/handleTextToSpeech";

const TextToSpeechViewer = ({ text }) => {
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const fetchAudioSrc = async () => {
      if (text) {
        try {
          const url = await handleTextToSpeech(text);
          setAudioSrc(url);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAudioSrc();
  }, [text]);

  return <>{audioSrc && <SoundViewer audioSrc={audioSrc} />}</>;
};

export default TextToSpeechViewer;
