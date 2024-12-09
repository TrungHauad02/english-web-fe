import HistoryListQuestion from "../common/HistoryListQuestion";

function SubmitVocabulary({dataTest,focusId}) 
{
    return(
        <>
        <HistoryListQuestion  dataTest={dataTest.questions} dataSubmitTest = {dataTest.submitTestMixingAnswers}
        focusId ={focusId} 
        />
        </>
    );
}
export default SubmitVocabulary;