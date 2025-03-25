import React from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Themeroutes from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthBackgroundProvider } from "./contexts/AuthBackgroundContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const App: React.FC = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthBackgroundProvider>
          <CssBaseline />
          {routing}
        </AuthBackgroundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
