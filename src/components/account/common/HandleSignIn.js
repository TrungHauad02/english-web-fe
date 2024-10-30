export const handleSignIn = (email, password, role, authContext, navigate, setError) => {
  if (authContext.SignIn(email, password, setError)) {
      switch (role) {
          case 'student':
              navigate('/student');
              break;
          case 'teacher':
              navigate('/teacher');
              break;
          case 'admin':
              navigate('/admin/teacher');
              break;
          default:
              break;
      }
      return true;
  } else {
      return false;
  }
};

export const handleClickShowPassword = (showPassword, setShowPassword) => {
  setShowPassword(!showPassword);
};
