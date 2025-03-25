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
      main: "#36ada4", // Vibrant emerald
      contrastText: "#ffffff", // Pure white
    },
    danger: {
      main: "#c10e18", // Bright coral
    },
    error: {
      main: "#c10e18", // Deep rose
    },
    warning: {
      main: "#facc15", // Soft gold
      contrastText: "#1f2937", // Charcoal
    },
    text: {
      primary: "#1e293b", // Navy charcoal
      secondary: "#64748b", // Cool grey
      danger: "#f43f5e", // Bright coral
    },
  },

  shape: {
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Libre Franklin',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: '300;400;500;600;700',
          src: `
            url('https://fonts.gstatic.com/s/librefranklin/v13/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLMWkANDJ.woff2') format('woff2')
          `,
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2212, U+2215, U+FEFF, U+FFFD'
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%'
        },
        body: {
          height: '100%',
          fontFamily: "'Libre Franklin', sans-serif"
        },
        "*": {
          boxSizing: "border-box",
        },
        "#root": {
          height: "100%",
        },
        "@import": [
          "url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap')",
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
          fontWeight: 700,
          boxShadow: "none",
          fontFamily: "'Libre Franklin', sans-serif",
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
          borderRadius: "24px",
          padding: "14px",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 700
          }
        }
      }
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
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Libre Franklin', sans-serif"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Libre Franklin', sans-serif"
        }
      }
    }
  },
  typography: {
    ...typography,
    fontFamily: "'Libre Franklin', sans-serif"
  },
  shadows: shadows as any,
});

export default modernTheme;
