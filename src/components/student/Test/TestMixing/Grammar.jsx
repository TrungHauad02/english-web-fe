import ListQuestion from "../common/ListQuestion";

function Grammar({status,dataTest,onAnswerChange,focusId,title}) 
{
    return(
        <>
        <ListQuestion status = {status} dataTest={dataTest} onAnswerChange={onAnswerChange}
        focusId ={focusId} title= {title} 
        />
        </>
    );
}
export default Grammar;