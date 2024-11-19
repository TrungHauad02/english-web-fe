import ListQuestion from "../common/ListQuestion";

function Vocabulary({dataTest,onAnswerChange,focusId,title,answers,setAnswers}) 
{
    return(
        <>
        <ListQuestion dataTest={dataTest} onAnswerChange={onAnswerChange} 
        focusId ={focusId} title= {title} 
        answers = {answers} setAnswers = {setAnswers}
        />
        </>
    );
}
export default Vocabulary;