import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from '../Users';

// Mock del useAuth
const mockAdminUser = {
  id: 1,
  username: 'admin',
  email: 'admin@abc.com',
  role: 'Admin' as const,
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
    user: mockAdminUser
  })
}));

describe('Users Component', () => {
  test('renders users page', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Gestión de usuarios del sistema')).toBeInTheDocument();
  });

  test('renders users table', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Usuario')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Rol')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  test('shows add user button for admin', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByText('Agregar Usuario')).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByPlaceholderText('Buscar usuarios...')).toBeInTheDocument();
  });

  test('displays user status badges', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(screen.getByText('Inactivo')).toBeInTheDocument();
  });

  test('shows action buttons for each user', () => {
    render(
      <div>
        <Users />
      </div>
    );

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });
});
