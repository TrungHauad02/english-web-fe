import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePageStudent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 100,
      once: false, // Đảm bảo hiệu ứng chạy mỗi khi phần tử xuất hiện
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
            padding: '1.5rem 0',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '1rem',
              width: '80%',
              transform: index % 2 === 0 ? 'translateX(-80px)' : 'translateX(80px)',
              transition: 'transform 1.5s ease-out',
            }}
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            <Grid container spacing={3}>
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
                        padding: '0 1.5rem',
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '1.8rem',
                          fontWeight: 'bold',
                          marginBottom: '0.8rem',
                          textAlign: { xs: 'center', md: 'left' },
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.title}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '1rem',
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
                        {section.title === 'TEST'
                        ? 'Take Test'
                        : section.title === 'SKILLS'
                        ? 'Improve English Skills'
                        : `Learn ${section.title}`}
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
                        padding: '0 1.5rem',
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: '1.8rem',
                          fontWeight: 'bold',
                          marginBottom: '0.8rem',
                          textAlign: { xs: 'center', md: 'left' },
                          fontFamily: 'Roboto',
                        }}
                      >
                        {section.title}
                      </Box>
                      <Box
                        sx={{
                          fontSize: '1rem',
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
