import React from "react";
import { Outlet } from "react-router-dom";
import { styled, Box, Container, Theme } from "@mui/material";
import Header from "./Header/Header";
import Footer from "../../components/Footer/Footer";
import { TopbarHeight } from "../../assets/global/Theme-variable";
import { useFooterVisibility } from "../../hooks/useFooterVisibility";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingTop: TopbarHeight,
}));

const FullLayout: React.FC = () => {
  const showFooter = useFooterVisibility();

  return (
    <MainWrapper>
      <Header sx={{ backgroundColor: "#fbfbfb" }} />
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
            <Outlet />
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

export default FullLayout;
