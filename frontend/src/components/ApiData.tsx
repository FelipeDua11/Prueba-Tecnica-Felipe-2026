import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ApiData.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const ApiData: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const endpoint = activeTab === 'posts' ? 'posts' : 'users';
      const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar ${activeTab === 'posts' ? 'posts' : 'usuarios'}`);
      }
      
      const data = await response.json();
      
      if (activeTab === 'posts') {
        setPosts(data.slice(0, 10)); // Limitar a 10 posts
      } else {
        setUsers(data.slice(0, 10)); // Limitar a 10 usuarios
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="api-data-container">
      <div className="api-data-header">
        <h2>API Pública - JSONPlaceholder</h2>
        <p>Datos de ejemplo desde API externa</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          📝 Posts
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Usuarios
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Cargando datos...</div>
      ) : (
        <div className="data-grid">
          {activeTab === 'posts' ? (
            posts.map((post) => (
              <div key={post.id} className="data-card post-card">
                <div className="card-header">
                  <h3>{post.title}</h3>
                  <span className="post-id">#{post.id}</span>
                </div>
                <div className="card-content">
                  <p>{post.body}</p>
                </div>
                <div className="card-footer">
                  <span className="user-id">Usuario ID: {post.userId}</span>
                </div>
              </div>
            ))
          ) : (
            users.map((user) => (
              <div key={user.id} className="data-card user-card">
                <div className="card-header">
                  <h3>{user.name}</h3>
                  <span className="user-id">#{user.id}</span>
                </div>
                <div className="card-content">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Teléfono:</strong> {user.phone}</p>
                  <p><strong>Website:</strong> {user.website}</p>
                </div>
                <div className="card-footer">
                  <button className="view-button">Ver Perfil</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="api-info">
        <h4>Información de la API</h4>
        <div className="info-grid">
          <div className="info-item">
            <strong>Endpoint:</strong> 
            <code>https://jsonplaceholder.typicode.com/{activeTab}</code>
          </div>
          <div className="info-item">
            <strong>Método:</strong> <code>GET</code>
          </div>
          <div className="info-item">
            <strong>Estado:</strong> 
            <span className="status success">Conectado</span>
          </div>
          <div className="info-item">
            <strong>Resultados:</strong> {activeTab === 'posts' ? posts.length : users.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiData;
