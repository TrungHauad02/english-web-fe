import { getRandomQuotes } from "api/feature/quotes/quotesService";
import { getListTopicActive } from "api/study/listTopic/listTopicService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useListTopic(path) {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, quoteRes] = await Promise.all([
          getListTopicActive(path, page - 1, 10, "serial"),
          getRandomQuotes(),
        ]);
        const topics = data.content;
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
        toast.error("Error while fetching data");
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
