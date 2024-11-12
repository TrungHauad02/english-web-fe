import { getRandomQuotes } from "api/feature/quotes/quotesService";
import { getListTopicActive } from "api/study/listTopic/listTopicService";
import { useEffect, useState } from "react";

export default function useListTopic(path) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListTopicActive(path, page - 1, 10, "serial");
        const topics = data.content;
        const quoteRes = await getRandomQuotes();
        if (quoteRes && quoteRes.length > 0) {
          setQuote(quoteRes[0].quote);
          setAuthor(quoteRes[0].author);
        }
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
    quote,
    author,
  };
}
