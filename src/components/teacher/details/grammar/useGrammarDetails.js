import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "api/study/grammar/grammarService";
import { toast } from "react-toastify";

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
      try {
        const grammarData = await getGrammarDetail(id);
        setLocalData(grammarData);
      } catch (error) {
        console.error(error);
        toast.error("Error while fetching data");
      }
    };
    fetchData();
  }, [id]);

  return {
    localData,
    setLocalData,
  };
}
