import { useParams } from "react-router-dom";
import { getGrammarDetail } from "../../../../api/teacher/detailManagerment";

export default function GrammarDetail() {
  const { id } = useParams();
  const data = getGrammarDetail(id);
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}
