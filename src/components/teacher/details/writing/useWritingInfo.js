export default function useWritingInfo(data, setData, isEditing) {
  const onChangeImage = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setData({ ...data, image: imageUrl });
    }
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
