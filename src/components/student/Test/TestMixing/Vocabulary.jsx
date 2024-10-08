import ListQuestion from "../common/ListQuestion";

function Vocabulary({status,dataTest,onAnswerChange,focusId,title}) 
{
    return(
        <>
        <ListQuestion status = {status} dataTest={dataTest} onAnswerChange={onAnswerChange} 
        focusId ={focusId} title= {title} 
        />
        </>
    );
}
export default Vocabulary;