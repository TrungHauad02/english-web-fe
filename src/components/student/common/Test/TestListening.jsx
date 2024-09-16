import MainTitle from "./MainTitle";
import ListQuestion from "./ListQuestion"
import { Box,Typography, Button } from "@mui/material";


function TestListening({list,quote, title, bg}){
    return(
        <Box>
        <MainTitle title="Listening" bg={bg} />
        <Box sx={{   background: '#FFF4CC',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    float:'right',
                    marginRight: '5%',
                    width:'10%',
                    padding:'0.5rem 1rem'
                    }}>
            <Typography align="center">
            <strong>Time remaining:</strong>
            <br />
            60:00
            </Typography>
        </Box>
        <Box  sx={{background:'#FFF4CC',float:'center',width:'5%', marginTop:'5%' ,   marginLeft: 'auto', marginRight: 'auto', textAlign: 'center',marginBottom:'1rem',padding:'0.5rem 1rem'}}>1/10</Box>
        <Box sx={{ border: '1px solid black',
  borderRadius: '1rem',padding: '0.5rem', marginLeft:'5%',marginRight:'5%' }} >
   
        <ListQuestion/>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:'1rem' }}>
        <Button 
            sx={{
            border: '0.0001rem solid black',
            borderRadius: '1rem',
            background: '#FFD984',
            color: 'black',
            textAlign: 'center',
            marginBottom: '2%',
            padding: '1rem 2rem'
            }}
        >
            SUBMIT
        </Button>
        </Box>
        </Box>
    );
}
export default TestListening;