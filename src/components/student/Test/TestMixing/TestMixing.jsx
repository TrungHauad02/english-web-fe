import MainTitle  from '../MainTitle';
import ItemTest from './ItemTest'
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
import { useLocation } from 'react-router-dom';




function TestMixing(){
    const location = useLocation();
    const { state } = location; 
    const datatest = state;
    const title = datatest.type;

    return(
        <>
        <MainTitle title="Mixing Test" bg={"/bg_test.png"}/>
        <Box sx={{marginTop:'5%',marginLeft:'5%',marginRight:'5%'}}>
        <ItemTest title ={title} datatest={datatest}/>
      
        </Box>
     
        </>
    );
}
export default TestMixing;