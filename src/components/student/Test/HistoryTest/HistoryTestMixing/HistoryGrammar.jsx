import ListQuestionSubmit from "./HistoryListQuestion";

function SubmitGrammar({dataTest,focusId}) 
{
    return(
        <>
        <ListQuestionSubmit  dataTest={dataTest.questions} dataSubmitTest = {dataTest.submitTestMixingAnswers}
        focusId ={focusId} 
        />
        </>
    );
}
export default SubmitGrammar;