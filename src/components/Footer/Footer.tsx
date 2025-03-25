import React from 'react';
import { Box, Typography } from '@mui/material';
import InvotraLogo from '../../assets/images/InvotraLogo.png';

interface FooterProps {
  visible?: boolean;
}

const Footer: React.FC<FooterProps> = ({ visible = true }) => {
  return (
    <Box
      component="footer"
      sx={{
        height: '56px',
        bgcolor: 'white',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paddingTop={0.75} 
          
          sx={{ letterSpacing: '-0.5px' }}
        >
          An
        </Typography>
        <a 
          href="https://invotra.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={InvotraLogo} 
            alt="Invotra"
            style={{ height: '16px' }}
          />
        </a>
        <Typography 
          variant="body1" 
          color="text.secondary" 
          paddingTop={0.75} 
          
          sx={{ letterSpacing: '-0.5px' }}
        >
          product
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
