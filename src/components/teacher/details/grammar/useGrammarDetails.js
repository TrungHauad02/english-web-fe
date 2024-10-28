import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "api/study/grammar/grammarService";

export default function useGrammarDetails() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);

  const emptyGrammar = {
    id: "-1",
    title: "",
    serial: 1,
    content: "",
    description: "",
    image: "",
    example: "",
    file: "",
    status: "ACTIVE",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id === "-1") {
        setLocalData(emptyGrammar);
        return;
      }
      const grammarData = await getGrammarDetail(id);
      setLocalData(grammarData);
    };
    fetchData();
  }, [id]);

  return {
    localData,
    setLocalData,
  };
}
