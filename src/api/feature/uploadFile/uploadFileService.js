import apiClient from "api/apiClient";

export const uploadFile = async (path, fileName, file) => {
  try {
    const data = {
      path: path,
      fileName: fileName,
      file: file,
    };
    const res = await apiClient.post("/upload-file", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (fileUrl) => {
  try {
    await apiClient.delete(`/upload-file`, { data: fileUrl });
  } catch (error) {
    throw error;
  }
};


export const downloadFile = async (fileUrl) => {
  try {
    const res = await apiClient.post(
      "/upload-file/download",
      { fileUrl },
      {
        responseType: "arraybuffer",
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

