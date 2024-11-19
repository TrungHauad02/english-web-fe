import ContentWritingMixing from './ContentWritingMixing'
function Writing({dataTest,onAnswerChange,focusId,title,answers,setAnswers}) 
{
    return(
        <>
        <ContentWritingMixing  answers = {answers} setAnswers = {setAnswers} datatestList={dataTest.dataitem} title={title} focusId= {focusId}/>
 
        </>
    );
}
export default Writing;