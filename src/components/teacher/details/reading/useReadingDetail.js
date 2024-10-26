import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReadingDetail } from "../../../../api/teacher/readingService";

export default function useReadingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReadingDetail(id);
      setLocalData(data);
    };
    fetchData();
  }, [id]);

  return { localData, setLocalData };
}
