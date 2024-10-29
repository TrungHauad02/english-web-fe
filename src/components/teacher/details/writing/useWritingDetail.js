import { getWritingDetail } from "api/study/writing/writingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWritingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWritingDetail(id);
      setLocalData(data);
    };
    fetchData();
  }, [id]);

  return { localData, setLocalData, isEditing, setIsEditing };
}
