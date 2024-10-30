import { getWritingDetail } from "api/study/writing/writingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWritingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const emptyWriting = {
    id: "-1",
    title: "",
    serial: 1,
    description: "",
    image: "",
    topic: "",
    status: "ACTIVE",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id === "-1") {
        setLocalData(emptyWriting);
        setIsEditing(true);
        return;
      }
      const data = await getWritingDetail(id);
      setLocalData(data);
      setIsEditing(false);
    };
    fetchData();
  }, [id]);

  return { localData, setLocalData, isEditing, setIsEditing };
}
