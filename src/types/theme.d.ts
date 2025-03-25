import '@mui/material/styles';
import * as React from 'react';

declare module '@mui/material/styles/createShape' {
  interface Shape {
    authForm?: {
      borderRadius?: {
        xs?: string;
        sm?: string;
      };
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    danger: Palette['primary'];
  }
  
  interface PaletteOptions {
    danger?: PaletteOptions['primary'];
  }

  
  interface TypeText {
    danger: string;
  }
  
  interface TypographyVariantsOptions {
    danger?: React.CSSProperties;
  }
  
  interface Theme {
    status?: {
      danger: string;
    };
  }
  
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
