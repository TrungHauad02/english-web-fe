import ContentWritingMixing from './ContentWritingMixing'
function Writing({status,dataTest,onAnswerChange,focusId,title}) 
{
    return(
        <>
        <ContentWritingMixing onAnswerChange={onAnswerChange} datatest={dataTest.dataitem[0]} title={title}/>
 
        </>
    );
}
export default Writing;