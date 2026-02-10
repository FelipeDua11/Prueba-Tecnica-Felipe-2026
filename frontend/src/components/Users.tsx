import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Users.css';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const Users: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/users/');
      if (!response.ok) {
        throw new Error('Error al cargar usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    const newUser = {
      username: `user_${Date.now()}`,
      email: `user${Date.now()}@abc.com`,
      role: 'User'
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al crear usuario');
      }

      await fetchUsers(); // Recargar lista
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear usuario');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }

      await fetchUsers(); // Recargar lista
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar usuario');
    }
  };

  if (user?.role !== 'Admin') {
    return (
      <div className="users-container">
        <div className="access-denied">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Gestión de Usuarios</h2>
        <button className="create-button" onClick={handleCreateUser}>
          + Nuevo Usuario
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Cargando usuarios...</div>
      ) : (
        <div className="users-grid">
          {users.map((userItem) => (
            <div key={userItem.id} className="user-card">
              <div className="user-avatar">
                {userItem.role === 'Admin' ? '👑' : '👤'}
              </div>
              <div className="user-info">
                <h3>{userItem.username}</h3>
                <p><strong>Email:</strong> {userItem.email}</p>
                <p><strong>Rol:</strong> {userItem.role}</p>
                <p><strong>ID:</strong> {userItem.id}</p>
                <p><strong>Estado:</strong> 
                  <span className={`status ${userItem.isActive ? 'active' : 'inactive'}`}>
                    {userItem.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </p>
                <p><strong>Creado:</strong> {new Date(userItem.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="user-actions">
                <button className="edit-button">Editar</button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteUser(userItem.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
