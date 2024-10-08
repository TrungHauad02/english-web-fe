import InformationTest from "../common/InformationTest"
import QuestionList from "../common/QuestionListTest"
import QuestionVocabulary from "../common/QuestionVocabulary"
import QuestionListening from "../common/QuestionListening"
import DataTestMixing from "../data/DataTestMixing"
import React, { useState } from 'react';
import QuestionReading from "../common/QuestionReading"
import QuestionWriting from "../common/QuestionWriting"
import { Box } from "@mui/material";
function Mixing (){
    const [type, setType] = useState('');
    const [dataitemtest, setdataitemtest] = useState();
    const handleRowClick = (question) => {
        setType(question.type);
        setdataitemtest(question)
      };
    return(
        <>
        <Box sx={{marginRight:'5%',marginLeft:'5%',marginBottom:'2%',marginTop:"2%"}}>
        <Box sx={{ display: 'flex', marginBottom: '2%', alignItems: 'stretch' }}>
    <Box sx={{ flex: 4, minHeight: 0 }}>
        <InformationTest data={DataTestMixing[0]} />
    </Box>

    <Box sx={{ marginLeft: '2%', flex: 6, minHeight: 0 }}>
        <QuestionList data={DataTestMixing} handleRowClick={handleRowClick}/>
    </Box>
</Box>

            {
            type === 'Vocabulary' || type === 'Grammar' ? (
                <QuestionVocabulary question={dataitemtest} />
            ) : type === 'Listening' ? (
                <QuestionListening data={dataitemtest} />
            ) : type === 'Reading' ? (
                <QuestionReading data={dataitemtest} />
            )
            : type === 'Writing' ? (
                <QuestionWriting data={dataitemtest} />
            )
            : null
        }
        </Box>
     
        </>
    );
}
export default Mixing