import { Box, Button } from '@mui/material';

function BtnPreviousNextContentTest({setIndexVisible,sumContent,indexVisible}){

    const handleBtnPrevious = () => {
        setIndexVisible((prevIndex) => {
          if (prevIndex > 0) {
            return prevIndex - 1;
          }
          return prevIndex;
        });
      };
    
      const handleBtnNext = () => {

        setIndexVisible((prevIndex) => {
 
          if (sumContent > prevIndex + 1) {
            return prevIndex + 1;
          }
          return prevIndex;
        });
      };

    return(
        <>
        <Box sx={{ display: 'flex', mt: 5, marginLeft:'5%', width:'45%',justifyContent:'center' }}>
        <Button variant="contained" sx={{ background: '#00796B',padding:'0.5rem',width:'7rem',fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500'}} 
        startIcon={<img src="/btn_previous.png" alt="Previous" style={{ width: '1rem', height: '1rem' }}  />} onClick={handleBtnPrevious}>Previous</Button>

        <Box variant="body1" sx={{ mx: 2, background: '#E0F7FA', padding:'0.5rem 2rem', textAlign:'center',alignContent: 'center',fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500' }}>{(indexVisible + 1)}/{sumContent}</Box>
        <Button variant="contained" sx={{ background: '#00796B', padding:'0.5rem 1rem',width:'7rem', fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500' }} 
        endIcon={<img src="/btn_next.png" alt="Next" style={{ width: '1rem', height: '1rem' }} />}  onClick={handleBtnNext}>Next</Button>
      </Box>
        </>
    );

}
export default BtnPreviousNextContentTest;