import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';

// Mock del useAuth
const mockUser = {
  id: 1,
  username: 'testuser',
  email: 'test@abc.com',
  role: 'User' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true
};

jest.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: true,
    user: mockUser
  })
}));

describe('Dashboard Component', () => {
  test('renders dashboard for authenticated user', () => {
    render(
      <div>
        <Dashboard />
      </div>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText(`Bienvenido, ${mockUser.username}!`)).toBeInTheDocument();
  });

  test('displays dashboard cards', () => {
    render(
      <div>
        <Dashboard />
      </div>
    );

    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Gestión de usuarios del sistema')).toBeInTheDocument();
    expect(screen.getByText('Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Visualización y gestión de pedidos')).toBeInTheDocument();
    expect(screen.getByText('Pagos')).toBeInTheDocument();
    expect(screen.getByText('Historial y estado de pagos')).toBeInTheDocument();
    expect(screen.getByText('API Pública')).toBeInTheDocument();
    expect(screen.getByText('Integración con servicios externos')).toBeInTheDocument();
  });

  test('displays user information', () => {
    render(
      <div>
        <Dashboard />
      </div>
    );

    expect(screen.getByText('Información del Usuario')).toBeInTheDocument();
    expect(screen.getByText(`Usuario:`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(`Rol:`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.role)).toBeInTheDocument();
    expect(screen.getByText(`Email:`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  test('displays microservices status', () => {
    render(
      <div>
        <Dashboard />
      </div>
    );

    expect(screen.getByText('Microservicios')).toBeInTheDocument();
    expect(screen.getByText('✅ Usuarios Service')).toBeInTheDocument();
    expect(screen.getByText('✅ Pedidos Service')).toBeInTheDocument();
    expect(screen.getByText('✅ Pagos Service')).toBeInTheDocument();
    expect(screen.getByText('✅ API Gateway')).toBeInTheDocument();
  });
});
