export const handleSignIn = (email, password, fakeDatabase, authContext, navigate, setError) => {
    const user = fakeDatabase.find(
      (u) => u.email === email && u.password === password
    );
  
    if (user) {
      localStorage.setItem('isSignIn', 'true');
      authContext.setAuthenticated(true);
      switch (user.role) {
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
    } else {
      authContext.setAuthenticated(false);
      setError('Incorrect email or password');
    }
  
    return null; 
  };

  export const handleClickShowPassword = (showPassword, setShowPassword) => {
    setShowPassword(!showPassword);
  };
  