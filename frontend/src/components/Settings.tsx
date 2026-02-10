import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Settings.css';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const handleSaveSettings = () => {
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('autoSave', autoSave.toString());
    localStorage.setItem('language', language);
    
    // Mostrar mensaje de éxito
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Configuración guardada exitosamente';
    document.body.appendChild(message);
    
    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="settings-container">
        <div className="access-denied">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Configuración del Sistema</h2>
        <p>Administra las preferencias y configuraciones de la aplicación</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h3>🎨 Apariencia</h3>
          <div className="setting-item">
            <label htmlFor="theme">Tema:</label>
            <select 
              id="theme" 
              value={theme} 
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
            >
              <option value="light">☀️ Claro</option>
              <option value="dark">🌙 Oscuro</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔔 Notificaciones</h3>
          <div className="setting-item">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="checkmark"></span>
              Activar notificaciones
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>💾 Datos</h3>
          <div className="setting-item">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              <span className="checkmark"></span>
              Guardado automático
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>🌐 Idioma</h3>
          <div className="setting-item">
            <label htmlFor="language">Idioma:</label>
            <select 
              id="language" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇺🇸 English</option>
              <option value="pt">🇧🇷 Português</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-button" onClick={handleSaveSettings}>
          💾 Guardar Configuración
        </button>
        <button className="reset-button">
          🔄 Restablecer Valores
        </button>
      </div>

      <div className="system-info">
        <h3>ℹ️ Información del Sistema</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Versión:</strong>
            <span>1.0.0</span>
          </div>
          <div className="info-item">
            <strong>Usuario Actual:</strong>
            <span>{user?.username}</span>
          </div>
          <div className="info-item">
            <strong>Rol:</strong>
            <span>{user?.role}</span>
          </div>
          <div className="info-item">
            <strong>Último Acceso:</strong>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
