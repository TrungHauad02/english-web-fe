import ListQuestion from "../common/ListQuestion";
import { Box } from "@mui/material";

function Reading({ status, dataTest, onAnswerChange, focusId, title }) {
    return (
        <>
            {dataTest && dataTest.dataitem && Array.isArray(dataTest.dataitem) ? (
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
            ) : (
                <p>No data available</p>
            )}
        </>
    );
    
}

export default Reading;
