import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { sections } from "./SectionContentHomeStudent.js";

const ContentHomeStudent = () => {
  const navigate = useNavigate();
  const [requiredLoginDialog, setrequiredLoginDialog] = useState(false); // Trạng thái modal

  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 100,
      once: false,
    });
  }, []);

  const handleButtonClick = (link) => {
    const isLoggedIn = localStorage.getItem('isSignIn') === 'true';

    if (isLoggedIn) {
      navigate(link); // Chuyển đến link mong muốn nếu đã đăng nhập
    } else {
      setrequiredLoginDialog(true); // Mở modal nếu chưa đăng nhập
    }
  };

  const handleCloseDialog = () => {
    setrequiredLoginDialog(false); // Đóng modal
    navigate('/student/account'); // Chuyển đến trang đăng nhập
  };

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
                        onClick={() => handleButtonClick(section.link)} // Sử dụng hàm handleButtonClick
                      >
                        {section.title === 'TEST'
                          ? 'Take Test'
                          : section.title === 'SKILLS'
                          ? 'Improve Your Skills'
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
                        onClick={() => handleButtonClick(section.link)} // Sử dụng hàm handleButtonClick
                      >
                        {section.title === 'TEST'
                          ? 'Take Test'
                          : section.title === 'SKILLS'
                          ? 'Improve Your Skills'
                          : `Learn ${section.title}`}
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

      {/* Modal yêu cầu đăng nhập */}
      <Dialog open={requiredLoginDialog} onClose={() => setrequiredLoginDialog(false)}>
        <DialogTitle>Remind</DialogTitle>
        <DialogContent>
          <DialogContentText>
          You need to sign in to continue. Please sign in to access this page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setrequiredLoginDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContentHomeStudent;
