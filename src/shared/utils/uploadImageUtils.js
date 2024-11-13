import {
  deleteFile,
  uploadFile,
} from "api/feature/uploadFile/uploadFileService";

export const handleFileUpload = async (oldFile, newFile, title, path) => {
  if (oldFile && oldFile !== newFile) {
    const sanitizedFileName = title.replace(/\s+/g, "_");
    const [, resFile] = await Promise.all([
      deleteFile(oldFile),
      uploadFile(path, sanitizedFileName.toLowerCase(), newFile),
    ]);
    return resFile.url;
  }
  return (
    oldFile ||
    (await uploadFile(
      path,
      title.replace(/\s+/g, "_").toLowerCase(),
      newFile
    ).then((res) => res.url))
  );
};

export const handleFileChange = (event, setImage) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};
