import { useNavigate } from 'react-router-dom';

export const HandleHomeStudent = (isAuthenticated) => {
  const navigate = useNavigate();

  const handleButtonClick = (link, setRequiredLoginDialog) => {
    if (isAuthenticated) {
      navigate(link); 
    } else {
      setRequiredLoginDialog(true); 
    }
  };

  const handleCloseDialog = (setRequiredLoginDialog) => {
    setRequiredLoginDialog(false);
    navigate('/account');
  };

  return { handleButtonClick, handleCloseDialog };
};
