import HistoryListQuestion from "../common/HistoryListQuestion";

function SubmitGrammar({dataTest,focusId}) 
{
    return(
        <>
        <HistoryListQuestion  dataTest={dataTest.questions} dataSubmitTest = {dataTest.submitTestMixingAnswers}
        focusId ={focusId} 
        />
        </>
    );
}
export default SubmitGrammar;