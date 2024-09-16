import MainPicture from "../common/MainPicture";
import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import listVocab from "./ListVocab";

function Vocabulary({topic}){

    topic = {
        title: "Environment",
        img: "/environment.png"
    }

    return (
    <>
        <MainPicture title={topic.title} src={topic.img}/>
        <MatchImageWithWord list={listVocab} />
    </>
    );
}

export default Vocabulary;