
import ListQuestion from '../common/ListQuestion'

function OneListeningTest({ oneListening, audioRef, onAudioEnd ,title,answers,setAnswers}) {
  return (
    <>
      <audio ref={audioRef} src={oneListening.content} onEnded={onAudioEnd} autoPlay  
     />  
      <ListQuestion 
    dataTest= {oneListening} answers = {answers}
    setAnswers ={setAnswers}
    title = {title} 
    /> 
    </>
  );
}

export default OneListeningTest;
