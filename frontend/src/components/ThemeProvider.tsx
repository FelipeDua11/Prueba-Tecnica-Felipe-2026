import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Cargar tema del localStorage o preferencia del sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Aplicar tema al document root
  useEffect(() => {
    console.log('🎨 Applying theme:', theme);
    
    // Aplicar al document root (más robusto que body)
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
    
    // También aplicar al body como fallback
    document.body.className = theme;
    document.body.setAttribute('data-theme', theme);
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme);
    
    console.log('✅ Theme applied successfully');
    console.log('📊 Document classes:', document.documentElement.className);
    console.log('📊 Body classes:', document.body.className);
    console.log('🎯 Data theme:', document.documentElement.getAttribute('data-theme'));
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('🔄 Toggling theme:', theme, '→', newTheme);
    setTheme(newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
