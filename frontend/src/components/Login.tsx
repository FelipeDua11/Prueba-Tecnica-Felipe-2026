import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(credentials);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Bienvenido</h2>
        <p className="login-subtitle">Inicia sesión en tu cuenta de ABC Company</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
              disabled={isLoading}
              data-testid="username-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              disabled={isLoading}
              data-testid="password-input"
            />
          </div>
          {error && <div className="error-message" data-testid="error-message">{error}</div>}
          <button type="submit" disabled={isLoading} className="login-button" data-testid="submit-button">
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="login-footer">
          <p>¿Necesitas ayuda? <button onClick={() => alert('Contacta al equipo de soporte: soporte@abc-company.com')} className="support-link">Contacta soporte</button></p>
        </div>
        <div className="demo-info">
          <p><strong>Credenciales de Demo:</strong></p>
          <p>Admin: admin / password</p>
          <p>Usuario: user / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
