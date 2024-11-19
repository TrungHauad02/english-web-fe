import ListQuestion from "../common/ListQuestion";

function Grammar({dataTest,onAnswerChange,focusId,title,answers,setAnswers}) 
{
    return(
        <>
        <ListQuestion  dataTest={dataTest} onAnswerChange={onAnswerChange}
        focusId ={focusId} title= {title} 
        answers = {answers} setAnswers = {setAnswers}
        />
        </>
    );
}
export default Grammar;