import { getWriteAWordByListeningId } from "api/study/listening/writeAWordService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWriteAWord() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    if (id === "-1") return;
    const listQuestion = await getWriteAWordByListeningId(id);
    setData(listQuestion);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddNewQuestion = () => {
    if (id === "-1") return;
    const newQuestion = {
      id: "-1",
      serial: data.length + 1,
      sentence: "",
      missingIndex: 0,
      audioUrl: "",
      correctAnswer: "",
      status: "ACTIVE",
      listeningId: id,
    };
    setData([...data, newQuestion]);
  };

  return {
    data,
    handleAddNewQuestion,
    fetchData,
  };
}
