import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Pagination,
  styled
} from '@mui/material';

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',

  height: 'auto',
}));

const MainTitleContainer = styled(Box)(({ theme }) => ({
  width: '25%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  textAlign: 'center',
  color: 'black',
  background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.4) 100%)',
  borderRadius: '0 20px 0 0',
}));

const MenuTest = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(12),
  display: 'flex',
  paddingLeft: theme.spacing(2),
  marginLeft: '5%',
  marginRight: '5%',
}));

const MenuButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#E2F392',
  color: 'black',
  borderRadius: '30px 30px 0 0',
  '&:hover': {
    backgroundColor: '#B3D02A',
  },
}));

const ListTestContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(12),
  paddingLeft: theme.spacing(2),
  marginLeft: '5%',
  marginRight: '5%',
}));

const TestCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#FFF4CC',
  marginBottom: theme.spacing(4),
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
}));

const DoTestButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ACCD0A',
  position: 'absolute',
  bottom: '5%',
  right: '5%',
  borderRadius: theme.shape.borderRadius,
}));

function ListTest_Skill({list,quote, title, bg}) {
  const testsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const list_test=[...list];



  const pageCount = Math.ceil(list_test.length / testsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const toListTestSkillTest = () => {
    const currentPath = location.pathname;
    const newPath = `${currentPath}/skilltest`;
    navigate(newPath);
  };

  const displayedtests = list_test.slice(
    (currentPage - 1) * testsPerPage,
    currentPage * testsPerPage
  );

  return (
    <Box>
      <ImageContainer>
        <img src="/bg_test.png" alt="Test" style={{ width: '100%', height: 'auto' }} />
        <MainTitleContainer>
          <Typography variant="h4" component="h1" sx={{ margin: 2 }}>
            TEST ONLINE
          </Typography>
        </MainTitleContainer>
      </ImageContainer>

      <MenuTest>
        <MenuButton onClick={toListTestSkillTest}>Reading</MenuButton>
        <MenuButton>Listening</MenuButton>
        <MenuButton>Writing</MenuButton>
        <MenuButton>Speaking</MenuButton>
      </MenuTest>

      <ListTestContainer>
          <Grid container spacing={4}>
      {displayedtests.map((test, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <TestCard>
            <CardContent>
              <Typography variant="h6" component="h4">{test.title}</Typography>
              <Typography><strong>Duration:</strong> {test.duration}</Typography>
              <Typography><strong>Number of Questions:</strong> {test.questions}</Typography>
              <Typography><strong>Score:</strong> {test.score}</Typography>
              <DoTestButton variant="contained">Do test</DoTestButton>
            </CardContent>
            <Button component="a" href="link-cua-ban"   sx={{padding: "6px 16px !important"}}>
              See History
            </Button>
          </TestCard>
          </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </ListTestContainer>
    </Box>
  );
}

export default ListTest_Skill;