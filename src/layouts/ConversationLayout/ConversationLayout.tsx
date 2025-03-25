import React from "react";
import { Box, styled } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useFooterVisibility } from "../../hooks/useFooterVisibility";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

const ConversationLayout: React.FC = () => {
  const showFooter = useFooterVisibility();

  return (
    <MainWrapper>
      <PageWrapper>
        <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
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
      </PageWrapper>
    </MainWrapper>
  );
};

export default ConversationLayout;
