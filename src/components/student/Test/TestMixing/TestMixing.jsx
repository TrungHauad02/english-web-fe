import MainTitle  from '../MainTitle';
import ItemTest from './ItemTest'
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';




function TestMixing({bg,title}){
    return(
        <>
        <MainTitle title="Mixing Test" bg={bg}/>
        <Box sx={{marginTop:'5%',marginLeft:'5%',marginRight:'5%'}}>
        <ItemTest title ={title}/>
      
        </Box>
     
        </>
    );
}
export default TestMixing;