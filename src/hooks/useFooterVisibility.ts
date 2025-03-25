import { useState, useEffect } from 'react';

export const useFooterVisibility = (): boolean => {
  const [showFooter, setShowFooter] = useState<boolean>(true);
  
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when scrolling near bottom
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showFooter;
};
