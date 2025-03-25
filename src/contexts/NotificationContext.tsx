import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface NotificationContextType {
  showNotification: (message: string, severity?: AlertColor) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

interface NotificationProviderProps {
  children: ReactNode;
}

export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: NotificationProviderProps): React.ReactElement {
  const [notification, setNotification] = useState<NotificationState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const showNotification = (message: string, severity: AlertColor = 'success'): void => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const hideNotification = (): void => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={hideNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={hideNotification}
          severity={notification.severity}
          sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            color: notification.severity === 'success' ? '#2e7d32' : '#c62828',
            '& .MuiAlert-icon': {
              color: notification.severity === 'success' ? '#2e7d32' : '#c62828'
            },
            boxShadow: 3
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}
