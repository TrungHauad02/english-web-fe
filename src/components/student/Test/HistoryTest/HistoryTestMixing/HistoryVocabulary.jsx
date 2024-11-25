import ListQuestionSubmit from "./HistoryListQuestion";

function SubmitVocabulary({dataTest,focusId}) 
{
    return(
        <>
        <ListQuestionSubmit  dataTest={dataTest.questions} dataSubmitTest = {dataTest.submitTestMixingAnswers}
        focusId ={focusId} 
        />
        </>
    );
}
export default SubmitVocabulary;