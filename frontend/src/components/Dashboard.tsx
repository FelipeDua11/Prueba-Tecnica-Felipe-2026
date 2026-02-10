import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Bienvenido, {user?.username}!</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <div className="card-content">
            <h3>Usuarios</h3>
            <p>Gestión de usuarios del sistema</p>
            {user?.role === 'Admin' && (
              <button className="card-button">Administrar</button>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <div className="card-content">
            <h3>Pedidos</h3>
            <p>Visualización y gestión de pedidos</p>
            <button className="card-button">Ver Pedidos</button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💳</div>
          <div className="card-content">
            <h3>Pagos</h3>
            <p>Historial y estado de pagos</p>
            <button className="card-button">Ver Pagos</button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🌐</div>
          <div className="card-content">
            <h3>API Pública</h3>
            <p>Integración con servicios externos</p>
            <button className="card-button">Explorar</button>
          </div>
        </div>

        {user?.role === 'Admin' && (
          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <div className="card-content">
              <h3>Configuración</h3>
              <p>Configuración del sistema</p>
              <button className="card-button">Configurar</button>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-info">
        <div className="info-section">
          <h4>Información del Usuario</h4>
          <ul>
            <li><strong>Usuario:</strong> {user?.username}</li>
            <li><strong>Rol:</strong> {user?.role}</li>
            <li><strong>Email:</strong> {user?.email}</li>
            <li><strong>Tema:</strong> <span id="current-theme">Claro</span></li>
          </ul>
        </div>
        
        <div className="info-section">
          <h4>Microservicios</h4>
          <ul>
            <li>✅ Usuarios Service</li>
            <li>✅ Pedidos Service</li>
            <li>✅ Pagos Service</li>
            <li>✅ API Gateway</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
