import { handleFileChange } from "shared/utils/uploadFileUtils";

export default function useWritingInfo(data, setData, isEditing, setIsEditing) {
  const onChangeImage = (e) => {
    if (!isEditing) return;
    handleFileChange(e, (imageData) => {
      setData((prevTopic) => ({ ...prevTopic, image: imageData }));
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
