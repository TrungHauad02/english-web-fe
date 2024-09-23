import React, { useState } from 'react';
import { Box } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import './Account.css'; // Import CSS

const Account = () => {
  const [formState, setFormState] = useState('signin'); // Trạng thái để theo dõi form hiện tại
  const [isFlipped, setIsFlipped] = useState(false); // Trạng thái để lật khung

  const toggleForm = (newState) => {
    setIsFlipped(true); // Lật khung

    setTimeout(() => {
      setFormState(newState); // Cập nhật trạng thái form
      setIsFlipped(false); // Đặt lại trạng thái lật
    }, 300); // Thời gian trễ để khung hoàn thành lật
  };

  return (
    <Box display="flex" height="100vh">
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
            {/* Hiển thị khung theo trạng thái */}
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
