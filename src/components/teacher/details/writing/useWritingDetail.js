import { getWritingDetail } from "api/study/writing/writingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWritingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const emptyWriting = {
      id: "-1",
      title: "",
      serial: 1,
      description: "",
      image: "",
      topic: "",
      status: "ACTIVE",
    };
    const fetchData = async () => {
      try {
        if (id === "-1") {
          setLocalData(emptyWriting);
          setIsEditing(true);
          return;
        }
        const data = await getWritingDetail(id);
        setLocalData(data);
        setIsEditing(false);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  const handleCloseError = () => {
    setError("");
  };

  return {
    localData,
    setLocalData,
    isEditing,
    setIsEditing,
    error,
    setError,
    handleCloseError,
  };
}
