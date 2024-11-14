import { useEffect, useState } from "react";
import {
  createGrammar,
  deleteGrammar,
  getGrammarDetail,
  updateGrammar,
} from "api/study/grammar/grammarService";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadImageUtils";

export default function useGrammarInfo(data, setData) {
  const { id } = useParams();
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCloseError = () => {
    setError("");
  };

  useEffect(() => {
    setIsEditing(id === "-1");
  }, [id]);

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      let updateTopic = topic;
      if (topic.image === "") {
        setError("Image cannot be empty");
        return;
      }

      if (topic.file === "") {
        setError("File cannot be empty");
        return;
      }

      setIsEditing(false);

      let topicDetail = { image: "", file: "" };
      if (id !== "-1") {
        topicDetail = await getGrammarDetail(id);
        updateTopic = topicDetail ? topicDetail : { image: "", file: "" };
      }
      const newImage = await handleFileUpload(
        topicDetail.image,
        topic.image,
        topic.title,
        "study/grammar"
      );

      const newFile = await handleFileUpload(
        topicDetail.file,
        topic.file,
        topic.title,
        "study/grammar"
      );

      if (newImage !== topicDetail.image) {
        updateTopic = { ...updateTopic, image: newImage };
      }

      if (newFile !== topicDetail.file) {
        updateTopic = { ...updateTopic, file: newFile };
      }

      if (id === "-1") {
        const data = await createGrammar(updateTopic);
        setData(data);
        navigate(`/teacher/grammars/${data.id}`);
        return;
      }
      const data = await updateGrammar(id, updateTopic);
      setData(data);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const handleDelete = async () => {
    if (id === "-1") return;
    try {
      await deleteGrammar(id);
      navigate(`/teacher/grammars`);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const onChangeImage = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      setTopic((prevTopic) => ({ ...prevTopic, image: imageData }));
    });
  };

  const onChangeTitle = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, title: e.target.value });
  };
  const onChangeSerial = (e) => {
    if (!isEditing) return;
    if (e.target.value <= 0) return;
    setTopic({ ...topic, serial: e.target.value });
  };

  const onChangeStatus = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, status: e.target.value });
  };

  const onChangeContent = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, content: e.target.value });
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeExample = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, example: e.target.value });
  };

  const onChangeFile = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      setTopic((prevTopic) => ({ ...prevTopic, file: imageData }));
      setData((prevTopic) => ({ ...prevTopic, file: imageData }));
    });
  };

  return {
    topic,
    isEditing,
    handleEditing,
    handleSave,
    handleDelete,
    onChangeImage,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
    onChangeContent,
    onChangeDescription,
    onChangeExample,
    onChangeFile,
    error,
    handleCloseError,
  };
}
