import { toast } from "react-toastify";
import { handleFileChange } from "shared/utils/uploadFileUtils";

export default function useWritingInfo(data, setData, isEditing, setIsEditing) {
  const onChangeImage = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      const img = new Image();
      img.onload = () => {
        setData((prevTopic) => ({ ...prevTopic, image: imageData }));
      };
      img.onerror = () => {
        toast.error("Invalid image file");
      };
      img.src = imageData;
    });
  };

  const onChangeTitle = (e) => {
    if (!isEditing) return;
    setData({ ...data, title: e.target.value });
  };
  const onChangeSerial = (e) => {
    if (!isEditing) return;
    if (e.target.value <= 0) return;
    setData({ ...data, serial: e.target.value });
  };

  const onChangeStatus = (e) => {
    if (!isEditing) return;
    setData({ ...data, status: e.target.value });
  };

  return {
    onChangeImage,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
  };
}
