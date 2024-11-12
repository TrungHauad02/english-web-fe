import { getWritingDetail } from "api/study/writing/writingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useWriting() {
    const [topic, setTopic] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWritingDetail(id);
            setTopic(data);
        };
        fetchData();
    }, [id]);

    return {
        topic
    };
}