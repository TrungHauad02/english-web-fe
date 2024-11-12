import {
  deleteFile,
  uploadFile,
} from "api/feature/uploadFile/uploadFileService";

export const handleImageUpload = async (oldImage, newImage, title, path) => {
  if (oldImage !== newImage) {
    const sanitizedFileName = title.replace(/\s+/g, "_");
    const [, resImage] = await Promise.all([
      deleteFile(oldImage),
      uploadFile(path, sanitizedFileName.toLowerCase(), newImage),
    ]);
    return resImage.url;
  }
  return oldImage;
};

export const handleImageChange = (event, setImage) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};
