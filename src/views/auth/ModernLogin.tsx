import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';
import { LoginForm } from './Login';
import { SignupForm } from './Signup';
import artoCorner from '../../assets/images/arto-corner.png';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const ModernLogin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const { login, signup } = useAuth();
  const { customImage } = useAuthBackground();
  const backgroundImage = customImage || artoCorner;
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        await signup(formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
    } catch (error) {
      setError(isSignup ? 'Failed to sign up' : 'Failed to log in');
    }
  };

  const toggleForm = (): void => {
    setIsSignup(!isSignup);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        bgcolor: muiTheme.palette.background.default
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '1 1 60%' },
          minHeight: { md: '100vh' },
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', md: '40%' },
          padding: { xs: 2, sm: 3, md: 4 },
          bgcolor: '#f5f5f5', // Replace with your desired background color
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        {isSignup ? (
          <SignupForm
            onSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            onLoginClick={toggleForm}
          />
        ) : (
          <LoginForm
            onSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            onSignupClick={toggleForm}
          />
        )}
      </Box>
    </Box>
  );
};

export default ModernLogin;
