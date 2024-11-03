import { getListTopicActive } from "api/study/listTopic/listTopicService";
import { useEffect, useState } from "react";

export default function useListTopic(path) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListTopicActive(path, page - 1, 10, "serial");
        const topics = data.content;
        setTotalPage(data.totalPages);
        if (topics) {
          setList(topics);
        } else {
          setList([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page, path]);
  const onChangePage = (e, value) => {
    setPage(value);
  };

  return {
    list,
    totalPage,
    onChangePage,
  };
}
