import {
  createWriting,
  deleteWriting,
  getWritingDetail,
  updateWriting,
} from "api/study/writing/writingService";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "shared/utils/handleError";
import { handleFileUpload } from "shared/utils/uploadFileUtils";

export default function useWritingTopic(
  data,
  setData,
  isEditing,
  setIsEditing,
  setError
) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEditing = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    if (!isEditing) return;
    try {
      await deleteWriting(id);
      navigate(`/teacher/writings`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSave = async () => {
    try {
      if (data.image === "") {
        setError("Image cannot be empty");
        return;
      }

      setIsEditing(false);

      let writingDetail = { image: "" };
      if (id !== "-1") {
        writingDetail = await getWritingDetail(id);
        writingDetail = writingDetail ? writingDetail : { image: "" };
      }

      const newImage = await handleFileUpload(
        writingDetail.image,
        data.image,
        data.title,
        "study/writing"
      );

      let updatedData = data;
      if (newImage !== writingDetail.image) {
        updatedData = { ...updatedData, image: newImage };
      }

      if (id === "-1") {
        const newData = await createWriting(updatedData);
        setData(newData);
        navigate(`/teacher/writings/${newData.id}`);
        return;
      }

      const newData = await updateWriting(id, updatedData);
      setData(newData);
      setIsEditing(false);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setData({ ...data, description: e.target.value });
  };

  const onChangeTopic = (e) => {
    if (!isEditing) return;
    setData({ ...data, topic: e.target.value });
  };

  return {
    handleEditing,
    handleSave,
    handleDelete,
    onChangeDescription,
    onChangeTopic,
  };
}
