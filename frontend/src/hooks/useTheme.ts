import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Detectar preferencia de tema del sistema
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Prioridad: tema guardado > preferencia del sistema > tema por defecto
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
  }, []);

  // Aplicar tema al body y guardar en localStorage
  useEffect(() => {
    console.log('Applying theme:', theme);
    console.log('Current body classes:', document.body.className);
    
    // Remover todas las clases de tema
    document.body.classList.remove('light', 'dark');
    
    // Agregar la clase del tema actual
    document.body.classList.add(theme);
    
    // También establecer className directamente como fallback
    document.body.className = theme;
    
    localStorage.setItem('theme', theme);
    
    console.log('New body classes:', document.body.className);
    console.log('Body computed style:', getComputedStyle(document.body).backgroundColor);
  }, [theme]);

  // Escuchar cambios en preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    console.log('Toggling theme from', theme, 'to', theme === 'light' ? 'dark' : 'light');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    setTheme,
    toggleTheme
  };
};
