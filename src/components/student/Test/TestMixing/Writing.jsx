import ListQuestion from "../common/ListQuestion";

function Writing({status,dataTest,onAnswerChange,focusId}) 
{
    return(
        <>
        <ListQuestion status = {status} dataTest={dataTest} onAnswerChange={onAnswerChange} 
        focusId ={focusId}
        />
        </>
    );
}
export default Writing;