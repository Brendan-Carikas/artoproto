import React, { useState } from 'react';
import { useFooterVisibility } from '../../hooks/useFooterVisibility';
import {
  Box,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../../components/Footer/Footer';
import Header from '../FullLayout/Header/Header';
import Sidebar from '../FullLayout/Sidebar/sidebar';

const drawerWidth = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 264,
  xl: 264
};

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: '36px',
  [theme.breakpoints.up('lg')]: {
    marginLeft: `${drawerWidth.lg}px`,
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '56px',
  },
}));

const VertShell = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const showFooter = useFooterVisibility();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      {/* Add your drawer content here */}
      <Typography variant="h6" sx={{ p: 2 }}>
        Sidebar Content
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      
      {/* Header */}
      <Header
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          boxShadow: '0px 7px 30px 0px rgb(90 114 123 / 11%)',
        }}
      />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ 
          position: 'fixed',
          top: { xs: '8px', sm: '12px' },
          left: '16px',
          zIndex: 1100,
          display: { lg: 'none' },
          color: 'primary.main'
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={true}
        isMobileSidebarOpen={mobileOpen}
        onSidebarClose={handleDrawerToggle}
      />

      {/* Main Content */}
      <Main open={!isMobile}>
        <Toolbar /> {/* Spacing for AppBar */}
        <Box sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Main>

      {/* Footer */}
      <Footer visible={showFooter} />
    </Box>
  );
};

export default VertShell;
