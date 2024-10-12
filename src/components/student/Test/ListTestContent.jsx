
import { 
    Box, 
    Typography, 
    Button, 
    Card, 
    CardContent, 
    Grid, 
    styled
  } from '@mui/material';

const ListTestContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(12),
  
    paddingLeft: theme.spacing(2),
  
  }));
  
  const TestCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FFF4CC',
    marginBottom: theme.spacing(4),
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }));
  
  const DoTestButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#6EC2F7',
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: theme.shape.borderRadius,
  }));

function ListTestContent({list}){
    return (
        <>
        <ListTestContainer>
        <Grid container spacing={4}>
          {list.map((test, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TestCard>
                <CardContent>
                  <Typography variant="h6" component="h4">{test.title}</Typography>
                  <Typography><strong>Duration:</strong> {test.duration}</Typography>
                  <Typography><strong>Number of Questions:</strong> {test.questions}</Typography>
                  <Typography><strong>Score:</strong> {test.score}</Typography>
                  <DoTestButton variant="contained">Do test</DoTestButton>
                </CardContent>
                <Button component="a" href="link-cua-ban" sx={{padding: "6px 16px !important"}}>
                  See History
                </Button>

              </TestCard>
            </Grid>
          ))}
        </Grid>
      </ListTestContainer>
        
        </>
    );
 
}
export default ListTestContent;