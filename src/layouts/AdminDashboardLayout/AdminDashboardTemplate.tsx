import React, { useState, ReactNode } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Tooltip,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';
import { TopbarHeight } from "../../assets/global/Theme-variable";
import Footer from "../../components/Footer/Footer";
import { useFooterVisibility } from "../../hooks/useFooterVisibility";

const drawerWidth = 240;

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingTop: TopbarHeight,
}));

interface MainProps {
  open: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<MainProps>(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

interface AdminDashboardTemplateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const AdminDashboardTemplate: React.FC<AdminDashboardTemplateProps> = ({ title, description, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState<boolean>(!isMobile);
  const showFooter = useFooterVisibility();

  const handleDrawerToggle = (): void => {
    setOpen(!open);
  };

  return (
    <MainWrapper>
      <CssBaseline />
      
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(0, 1) }}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, p: 2 }}>
            Admin Panel
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        {/* Add your sidebar navigation items here */}
      </Drawer>

      {/* Main Content */}
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: "20px !important",
            paddingRight: "20px !important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <Main open={open}>
              <Box sx={{ p: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1.2 }}>
                  <DashboardIcon color="primary" sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h2">
                      {title}
                    </Typography>
                    {description && (
                      <Typography variant="body1" sx={{ ml: 0 }}>
                        {description}
                      </Typography>
                    )}
                  </Box>
                
                  <Box sx={{ flexGrow: 1 }} />
                </Box>

                <Container maxWidth="xl" sx={{ mt: 2 }}>
                  <Grid container spacing={3}>
                    {children}
                  </Grid>
                </Container>
              </Box>
            </Main>
          </Box>
          <Box
            sx={{
              opacity: showFooter ? 1 : 0,
              visibility: showFooter ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              mb: 2,
              mt: 'auto'
            }}
          >
            <Footer />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default AdminDashboardTemplate;
