import { createTheme, Theme } from "@mui/material/styles";
import typography from "./Typography-modern";
import shadows from "./Shadows";
import icons from "./Icons-dark";

const darkTheme: Theme = createTheme({
  direction: "ltr",
  palette: {
    mode: 'dark',
    primary: {
      main: "#36ADA4",
      light: "#818cf8",
    },
    secondary: {
      main: "#a855f7",
      light: "#c084fc",
    },
    background: {
      default: "#0B1215",
      paper: "#0B1215",
    },
    success: {
      main: "#22c55e",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#f43f5e",
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#facc15",
      contrastText: "#1f2937",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#ffffff",
      danger: "#f43f5e",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiSvgIcon: {
      defaultProps: icons.defaultProps,
      styleOverrides: icons.styleOverrides
    },
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
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#0B1215 !important',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(248, 250, 252, 0.08)',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        BackdropProps: {
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      },
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            backgroundColor: '#0B1215',
            backgroundImage: 'none !important',
          },
        },
        paper: {
          backgroundColor: '#0B1215 !important',
          backgroundImage: 'none !important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "14px",
          backgroundColor: '#0B1215 !important',
          backgroundImage: 'none !important',
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: '50px !important',
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
          },
        },
      },
    },
  },
  typography,
  shadows: shadows as any,
});

export default darkTheme;
