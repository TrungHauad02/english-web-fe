import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePageStudent = () => {
  useEffect(() => {
    AOS.init({
      duration: 2500, // Tăng thời gian hiệu ứng lên 2.5 giây
      delay: 200,     // Thêm độ trễ trước khi hiệu ứng bắt đầu
    });
  }, []);

  const sections = [
    {
      title: 'VOCABULARY',
      description: 'Start learning new words today to improve your communication skills. Our vocabulary lessons are tailored to help you in mastering new words in no time.',
      imgSrc: '/img_home_vocabulary.png',
    },
    {
      title: 'GRAMMAR',
      description: 'Master the rules of grammar to write and speak more effectively. Our grammar lessons are designed to help you understand the intricacies of the English language.',
      imgSrc: '/img_home_grammar.png',
    },
    {
      title: 'SKILLS',
      description: 'Enhance your listening skills to understand native speakers more clearly. Our listening exercises focus on real-life conversations.',
      imgSrc: '/img_home_skills.png',
    },
    {
      title: 'TEST',
      description: 'Develop your speaking skills to communicate more fluently. Practice with interactive lessons to improve your confidence.',
      imgSrc: '/img_home_test.png',
    },
  ];

  return (
    <>
      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0', // Thay đổi padding để thêm không gian
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'tranparent',
              borderTopRightRadius: '1rem',
              borderBottomRightRadius: '1rem',
              width: '70%',
              transform: index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)', // Điều chỉnh khoảng cách di chuyển
              transition: 'transform 2s ease-out', // Thay đổi thời gian di chuyển
            }}
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            <Grid container spacing={4}> {/* Tăng khoảng cách giữa các phần tử */}
              {index % 2 === 0 ? (
                <>
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={section.imgSrc}
                      alt={section.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        padding: '0 2rem',
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          marginBottom: '1rem',
                          textAlign: { xs: 'center', md: 'left' },
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.title}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '1rem',
                          textAlign: { xs: 'center', md: 'left' },
                          textAlign: 'justify',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.description}
                      </Box>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          margin: '1rem 0',
                          width: '50%',
                          background: '#4a475c',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                        }}
                      >
                        {section.title === 'TEST' ? 'Take Test' : `Learn ${section.title}`}
                      </Button>
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        padding: '0 2rem',
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          marginBottom: '1rem',
                          textAlign: { xs: 'center', md: 'left' },
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.title}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '1rem',
                          textAlign: { xs: 'center', md: 'left' },
                          textAlign: 'justify',
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.description}
                      </Box>
                      <Button
                        variant="contained"
                        disableElevation
                        sx={{
                          margin: '1rem 0',
                          width: '50%',
                          background: '#4a475c',
                          borderRadius: '1rem',
                          fontSize: '1rem',
                        }}
                      >
                        {section.title === 'TEST' ? 'Take Test' : `Learn ${section.title}`}
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={section.imgSrc}
                      alt={section.title}
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default HomePageStudent;
