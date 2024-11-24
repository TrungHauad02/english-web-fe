import React, { useState } from 'react';
import { Box } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './forgotPassword/ForgotPassword';
import './Account.css'; 

const Account = () => {
  const [formState, setFormState] = useState('signin');
  const [isFlipped, setIsFlipped] = useState(false); 

  const toggleForm = (newState) => {
    setIsFlipped(true); 

    setTimeout(() => {
      setFormState(newState); 
      setIsFlipped(false); 
    }, 300); 
  };

  return (
    <Box display="flex" height="84vh" paddingTop={7}>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundImage: 'url(/bg_login.png)',
          backgroundSize: '70%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: 'white' }}
      >
        <Box className="container">
          <Box className={`card ${isFlipped ? 'flipped' : ''}`}>
            {formState === 'signin' && (
              <div className="card-front">
                <SignIn toggleForm={toggleForm} />
              </div>
            )}
            {formState === 'signup' && (
              <div className="card-back">
                <SignUp toggleForm={toggleForm} />
              </div>
            )}
            {formState === 'forgot' && (
              <div className="card-back">
                <ForgotPassword toggleForm={toggleForm} />
              </div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Account;