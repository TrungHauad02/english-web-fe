import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReadingDetail } from "api/study/reading/readingService";

export default function useReadingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);

  const emptyReading = {
    id: "-1",
    title: "",
    serial: 1,
    content: "",
    description: "",
    image: "",
    status: "ACTIVE",
  };

  const fetchData = async () => {
    if (id === "-1") {
      setLocalData(emptyReading);
    }
    try {
      const data = await getReadingDetail(id);
      setLocalData(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { localData, setLocalData };
}
