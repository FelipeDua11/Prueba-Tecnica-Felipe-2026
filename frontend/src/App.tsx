import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './components/ThemeProvider';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Orders from './components/Orders';
import Payments from './components/Payments';
import ApiData from './components/ApiData';
import Settings from './components/Settings';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          {isAuthenticated && (
            <button className="menu-toggle" onClick={toggleSidebar}>
              ☰
            </button>
          )}
          <h1>ABC Company - Microservices Platform</h1>
          <ThemeToggle />
        </div>
      </header>

      {isAuthenticated && (
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

      <main className="main-content">
        <div className="page-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                {user?.role === 'Admin' ? <Users /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/payments" element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/api-data" element={
              <ProtectedRoute>
                <ApiData />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                {user?.role === 'Admin' ? <Settings /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
