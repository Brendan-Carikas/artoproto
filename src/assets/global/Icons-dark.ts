import { Components } from '@mui/material/styles';

interface IconsStyleOverrides {
  defaultProps: {
    fontSize: 'medium' | 'small' | 'large' | 'inherit';
  };
  styleOverrides: {
    fontSizeLarge: {
      fontSize: string;
    };
    fontSizeMedium: {
      fontSize: string;
    };
    fontSizeSmall: {
      fontSize: string;
    };
    root: {
      color: string;
      transition: string;
    };
  };
  variants: Array<{
    props: {
      color?: string;
      variant?: string;
    };
    style: {
      color: string;
    };
  }>;
}

const icons: IconsStyleOverrides = {
  defaultProps: {
    fontSize: 'medium',
  },
  styleOverrides: {
    fontSizeLarge: {
      fontSize: '2rem',
    },
    fontSizeMedium: {
      fontSize: '1.5rem',
    },
    fontSizeSmall: {
      fontSize: '1.25rem',
    },
    root: {
      color: 'inherit',
      transition: 'all 0.2s ease-in-out',
    },
  },
  variants: [
    {
      props: { color: 'primary' },
      style: {
        color: '#36ADA4',
      },
    },
    {
      props: { color: 'secondary' },
      style: {
        color: '#a855f7',
      },
    },
    {
      props: { color: 'success' },
      style: {
        color: '#22c55e',
      },
    },
    {
      props: { color: 'warning' },
      style: {
        color: '#facc15',
      },
    },
    {
      props: { color: 'error' },
      style: {
        color: '#ef4444',
      },
    },
    {
      props: { color: 'info' },
      style: {
        color: '#36ADA4',
      },
    },
  ],
};

export default icons;
