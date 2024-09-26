import { Box } from "@mui/material";

function ItemTitleTest({title}){
    return(
        <>
        <Box sx={{background:"linear-gradient(to bottom, #E8F5A8 0%, #FFF4CC 100%)",
                textAlign: 'center',
                width: '10%',
                padding: '1rem 2rem' ,
                fontSize: '24px',
                marginBottom:'2%',
                borderRadius: '4rem',
        }}>
            {title}
        </Box>
        </>
    );

};
export default ItemTitleTest;