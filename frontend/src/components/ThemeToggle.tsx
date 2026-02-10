import React from 'react';
import { useThemeContext } from './ThemeProvider';
import '../styles/ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark } = useThemeContext();

  return (
    <button 
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
