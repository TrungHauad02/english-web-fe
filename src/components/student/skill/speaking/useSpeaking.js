import { getSpeakingDetail } from "api/study/speaking/speakingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useSpeaking() {
    const [topic, setTopic] = useState();
    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => { 
            const data = await getSpeakingDetail(id);
            setTopic(data);
        };
        fetchData();
    }, [id]);

    return {
        topic
    };
}