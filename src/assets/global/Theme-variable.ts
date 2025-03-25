import { createTheme, Theme } from "@mui/material/styles";
import typography from "./Typography";
import shadows from "./Shadows";

// ##############################
// // // Global Variables
// ##############################

const SidebarWidth: number = 265;
const TopbarHeight: number = 70;

// Using the global type declarations from /src/types/theme.d.ts

const baseTheme: Theme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#1B1464",
      light: "#e6f4ff",
    },
    secondary: {
      main: "#1e4db7",
    },
    background: {
      default: "#fff",
    },
    success: {
      main: "#39cb7f",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#fc4b6c",
    },
    error: {
      main: "#fc4b6c",
    },
    warning: {
      main: "#fdd43f",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    } as any,
  },
  shape: {
    borderRadius: 5,
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
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "15px !important",
          paddingRight: "15px !important",
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
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: "9px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "14px",
          margin: "15px",
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
        },
      },
    },

    // MuiGridItem is not a standard MUI component, using custom styling
    // Removing this to fix TypeScript errors
    /* MuiGridItem: {
      styleOverrides: {
        root: {
          paddingTop: "30px",
          paddingLeft: "30px !important",
        },
      },
    }, */
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white !important',
          borderBottom: '1px solid rgb(0 0 0 / 12%)',
        },
      },
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: TopbarHeight,
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  typography,
  shadows: shadows as any,
});

export { TopbarHeight, SidebarWidth, baseTheme };
