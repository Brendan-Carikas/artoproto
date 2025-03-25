import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_BG_KEY = 'auth_background_visible';
const AUTH_BG_IMAGE_KEY = 'auth_background_image';
const AUTH_BG_ALIGN_KEY = 'auth_background_align';
const AUTH_MODAL_KEY = 'auth_background_modal';
const AUTH_TWO_COLUMN_KEY = 'auth_background_two_column';

interface AuthBackgroundContextType {
  showBackground: boolean;
  setShowBackground: (value: boolean) => void;
  alignLeft: boolean;
  setAlignLeft: (value: boolean) => void;
  customImage: string | null;
  setCustomImage: (value: string | null) => void;
  isModal: boolean;
  setIsModal: (value: boolean) => void;
  isTwoColumn: boolean;
  setIsTwoColumn: (value: boolean) => void;
  unsavedChanges: boolean;
  saveChanges: () => void;
}

const AuthBackgroundContext = createContext<AuthBackgroundContextType | null>(null);

interface AuthBackgroundProviderProps {
  children: ReactNode;
}

export function useAuthBackground(): AuthBackgroundContextType {
  const context = useContext(AuthBackgroundContext);
  if (!context) {
    throw new Error('useAuthBackground must be used within an AuthBackgroundProvider');
  }
  return context;
}

export function AuthBackgroundProvider({ children }: AuthBackgroundProviderProps): React.ReactElement {
  const [showBackground, setShowBackground] = useState<boolean>(() => {
    const saved = localStorage.getItem(AUTH_BG_KEY);
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [alignLeft, setAlignLeft] = useState<boolean>(() => {
    const saved = localStorage.getItem(AUTH_BG_ALIGN_KEY);
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [customImage, setCustomImage] = useState<string | null>(() => {
    const saved = localStorage.getItem(AUTH_BG_IMAGE_KEY);
    return saved || null;
  });
  
  const [isModal, setIsModal] = useState<boolean>(() => {
    const saved = localStorage.getItem(AUTH_MODAL_KEY);
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [isTwoColumn, setIsTwoColumn] = useState<boolean>(() => {
    const saved = localStorage.getItem(AUTH_TWO_COLUMN_KEY);
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  
  const handleShowBackgroundChange = (newValue: boolean): void => {
    setShowBackground(newValue);
    setUnsavedChanges(true);
  };

  const handleAlignLeftChange = (newValue: boolean): void => {
    setAlignLeft(newValue);
    setUnsavedChanges(true);
  };

  const handleCustomImageChange = (newValue: string | null): void => {
    setCustomImage(newValue);
    setUnsavedChanges(true);
  };

  const handleIsModalChange = (newValue: boolean): void => {
    setIsModal(newValue);
    setUnsavedChanges(true);
  };

  const handleIsTwoColumnChange = (newValue: boolean): void => {
    setIsTwoColumn(newValue);
    setUnsavedChanges(true);
  };
  
  const saveChanges = (): void => {
    localStorage.setItem(AUTH_BG_KEY, JSON.stringify(showBackground));
    localStorage.setItem(AUTH_BG_ALIGN_KEY, JSON.stringify(alignLeft));
    if (customImage) {
      localStorage.setItem(AUTH_BG_IMAGE_KEY, customImage);
    } else {
      localStorage.removeItem(AUTH_BG_IMAGE_KEY);
    }
    localStorage.setItem(AUTH_MODAL_KEY, JSON.stringify(isModal));
    localStorage.setItem(AUTH_TWO_COLUMN_KEY, JSON.stringify(isTwoColumn));
    setUnsavedChanges(false);
  };

  useEffect(() => {
    localStorage.setItem(AUTH_BG_KEY, JSON.stringify(showBackground));
  }, [showBackground]);

  useEffect(() => {
    localStorage.setItem(AUTH_BG_ALIGN_KEY, JSON.stringify(alignLeft));
  }, [alignLeft]);

  useEffect(() => {
    if (customImage) {
      localStorage.setItem(AUTH_BG_IMAGE_KEY, customImage);
    } else {
      localStorage.removeItem(AUTH_BG_IMAGE_KEY);
    }
  }, [customImage]);

  useEffect(() => {
    localStorage.setItem(AUTH_MODAL_KEY, JSON.stringify(isModal));
  }, [isModal]);

  useEffect(() => {
    localStorage.setItem(AUTH_TWO_COLUMN_KEY, JSON.stringify(isTwoColumn));
  }, [isTwoColumn]);

  useEffect(() => {
    setUnsavedChanges(true);
  }, [showBackground, alignLeft, customImage, isModal, isTwoColumn]);

  const value: AuthBackgroundContextType = {
    showBackground,
    setShowBackground: handleShowBackgroundChange,
    alignLeft,
    setAlignLeft: handleAlignLeftChange,
    customImage,
    setCustomImage: handleCustomImageChange,
    isModal,
    setIsModal: handleIsModalChange,
    isTwoColumn,
    setIsTwoColumn: handleIsTwoColumnChange,
    unsavedChanges,
    saveChanges
  };

  return (
    <AuthBackgroundContext.Provider value={value}>
      {children}
    </AuthBackgroundContext.Provider>
  );
}
