import ContentWritingMixing from './ContentWritingMixing'
function Writing({dataTest,focusId,title,answers,setAnswers}) 
{
    return(
        <>
        <ContentWritingMixing  answers = {answers} setAnswers = {setAnswers} dataTestList={dataTest.dataItem} title={title} focusId= {focusId}/>
 
        </>
    );
}
export default Writing;