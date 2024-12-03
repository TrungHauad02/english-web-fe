import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReading,
  deleteReading,
  getReadingDetail,
  updateReading,
} from "api/study/reading/readingService";
import handleError from "shared/utils/handleError";
import {
  handleFileChange,
  handleFileUpload,
} from "shared/utils/uploadFileUtils";
import { toast } from "react-toastify";

export default function useReadingInfo(data, setData) {
  const { id } = useParams();
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsEditing(id === "-1");
  }, [id]);

  const handleCloseError = () => {
    setError("");
  };

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      if (!isEditing) return;
      await deleteReading(id);
      navigate(`/teacher/readings`);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const handleSave = async () => {
    try {
      if (topic.image === "") {
        setError("Image cannot be empty");
        return;
      }

      if (topic.file === "") {
        setError("File cannot be empty");
        return;
      }

      setIsEditing(false);

      let readingDetail = { image: "", file: "" };
      if (id !== "-1") {
        readingDetail = await getReadingDetail(id);
        readingDetail = readingDetail ? readingDetail : { image: "", file: "" };
      }

      const newImage = await handleFileUpload(
        readingDetail.image,
        topic.image,
        topic.title,
        "study/reading"
      );

      const newFile = await handleFileUpload(
        readingDetail.file,
        topic.file,
        topic.title,
        "study/reading"
      );
      let updateTopic = topic;
      if (newImage !== readingDetail.image) {
        updateTopic = { ...updateTopic, image: newImage };
      }

      if (newFile !== readingDetail.file) {
        updateTopic = { ...updateTopic, file: newFile };
      }

      if (id === "-1") {
        const data = await createReading(updateTopic);
        setTopic(data);
        navigate(`/teacher/readings/${data.id}`);
        return;
      }

      const data = await updateReading(id, updateTopic);
      setTopic(data);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const onChangeImage = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      const img = new Image();
      img.onload = () => {
        setTopic((prevTopic) => ({ ...prevTopic, image: imageData }));
      };
      img.onerror = () => {
        toast.error("Invalid image file");
      };
      img.src = imageData;
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

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeFile = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (fileData) => {
      const file = e.target.files[0];

      if (file && file.type === "application/pdf") {
        setTopic((prevTopic) => ({ ...prevTopic, file: fileData }));
        setData((prevTopic) => ({ ...prevTopic, file: fileData }));
      } else {
        toast.error("Only PDF files are allowed");
      }
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
    onChangeDescription,
    onChangeFile,
    error,
    handleCloseError,
  };
}
