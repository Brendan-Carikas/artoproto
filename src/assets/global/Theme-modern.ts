import { createTheme, Theme } from "@mui/material/styles";
import shadows from "./Shadows";
import icons from "./Icons-modern";
import typography from "./Typography-modern";

// Using the global type declarations from /src/types/theme.d.ts

const modernTheme: Theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#1C1362", // Ethereal indigo
      light: "#eef2ff", // Soft lavender
    },
    secondary: {
      main: "#8b5cf6", // Ethereal violet
      light: "#f3e8ff", // Light orchid
    },
    background: {
      default: "#f8fafc", // Cool white
      paper: "#ffffff", // Pure white
    },
    success: {
      main: "#22c55e", // Vibrant emerald
      contrastText: "#ffffff", // Pure white
    },
    danger: {
      main: "#f43f5e", // Bright coral
    },
    error: {
      main: "#e11d48", // Deep rose
    },
    warning: {
      main: "#facc15", // Soft gold
      contrastText: "#1f2937", // Charcoal
    },
    text: {
      primary: "#1e293b", // Navy charcoal
      secondary: "#64748b", // Cool grey
      danger: "#f43f5e", // Bright coral
    } as any,
  },

  shape: {
    borderRadius: 6, // More rounded corners
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        "#root": {
          height: "100%",
        },
        "@import": [
          "url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap')",
        ],
      },
    },
    MuiSvgIcon: {
      defaultProps: icons.defaultProps,
      styleOverrides: icons.styleOverrides
    },
    MuiIcon: {
      defaultProps: icons.defaultProps,
      styleOverrides: icons.styleOverrides
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px !important",
          paddingRight: "24px !important",
          maxWidth: "1600px",
          '&.auth-container': {
            maxWidth: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "25px",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#111827", // Adding default color for icons
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
        },
        sizeMedium: {
          width: "40px",
          height: "40px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          padding: "14px",
        
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white !important',
          borderBottom: '1px solid rgb(0 0 0 / 12%)',
        },
      },
    },
  },
  typography,
  shadows: shadows as any,
});

export default modernTheme;
