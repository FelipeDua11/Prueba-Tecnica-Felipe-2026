import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: '📊',
      requiredRole: 'User' as const
    },
    { 
      id: 'users', 
      label: 'Usuarios', 
      icon: '👥',
      requiredRole: 'Admin' as const
    },
    { 
      id: 'orders', 
      label: 'Pedidos', 
      icon: '📦',
      requiredRole: 'User' as const
    },
    { 
      id: 'payments', 
      label: 'Pagos', 
      icon: '💳',
      requiredRole: 'User' as const
    },
    { 
      id: 'api-data', 
      label: 'API Pública', 
      icon: '🌐',
      requiredRole: 'User' as const
    },
    { 
      id: 'settings', 
      label: 'Configuración', 
      icon: '⚙️',
      requiredRole: 'Admin' as const
    }
  ];

  const filteredMenuItems = menuItems.filter(item => {
    if (!user) return false;
    if (item.requiredRole === 'Admin') return user.role === 'Admin';
    return true; // 'User' role puede acceder a todo
  });

  const handleLogout = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>ABC Company</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="user-info">
          <div className="user-avatar">
            {user?.role === 'Admin' ? '👑' : '👤'}
          </div>
          <div className="user-details">
            <div className="username">{user?.username}</div>
            <div className="role">{user?.role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {filteredMenuItems.map(item => (
              <li key={item.id} className="nav-item">
                <a href={`#${item.id}`} className="nav-link">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
