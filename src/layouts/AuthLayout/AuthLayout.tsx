import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Footer from '../../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';
import { useTheme } from '@mui/material/styles';
import artoCorner from '../../assets/images/arto-corner.png';
import chatBubble from '../../assets/images/art-bubble-blue.png';

const AuthLayout: React.FC = () => {
  const { showBackground, customImage } = useAuthBackground();
  const backgroundImage = customImage || artoCorner;
  const location = useLocation();
  const theme = useTheme();
  const [showFooter, setShowFooter] = useState<boolean>(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when scrolling near bottom
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If it's the modern login page, don't apply the auth layout
  if (location.pathname === '/modern-login') {
    return <Outlet />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto'
      }}
    >
      <Box
        component="img"
        src={chatBubble}
        alt=""
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          maxHeight: {
            xs: '200px',
            sm: '300px',
            md: '800px'
          },
          width: 'auto',
          display: { md: 'block' },
          marginLeft: '-64px',
          marginTop: '-64px',
          opacity: 0.05
        }}
      />
      <Box
        component="img"
        src={backgroundImage}
        alt=""
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          maxHeight: {
            xs: '400px',
            sm: '600px',
            md: '600px'
          },
          width: 'auto',
          display: { md: 'block' },
          marginRight: '48px',
          marginBottom: showFooter ? '116px' : '88px',
          transition: 'margin-bottom 0.3s ease'
        }}
      />
      <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pb: '76px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '600px', p: { xs: 0, sm: 3 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          opacity: showFooter ? 1 : 0,
          visibility: showFooter ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          mb: 2
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default AuthLayout;
