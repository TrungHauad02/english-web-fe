import ListQuestion from "../common/ListQuestion";
import { Box } from "@mui/material";

function Listening({ status, dataTest, onAnswerChange, focusId, title }) {
    return (
        <>
        {
                dataTest.dataitem.map(item => (
                    <Box key={item.id}>
                        {item.content}
                        <ListQuestion 
                            status={status} 
                            dataTest={item} 
                            onAnswerChange={onAnswerChange} 
                            focusId={focusId} 
                            title={title} 
                        />
                    </Box>
                ))
            }
        </>
    );
    
}

export default Listening;
