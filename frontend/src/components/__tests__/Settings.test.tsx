import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Settings from '../Settings';

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

describe('Settings Component', () => {
  test('renders settings page', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Configuración')).toBeInTheDocument();
    expect(screen.getByText('Preferencias de la aplicación')).toBeInTheDocument();
  });

  test('renders appearance section', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Apariencia')).toBeInTheDocument();
    expect(screen.getByText('Tema')).toBeInTheDocument();
    expect(screen.getByText('Modo Oscuro')).toBeInTheDocument();
  });

  test('renders notifications section', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Notificaciones')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Push')).toBeInTheDocument();
  });

  test('renders data section', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Datos')).toBeInTheDocument();
    expect(screen.getByText('Exportar Datos')).toBeInTheDocument();
    expect(screen.getByText('Limpiar Caché')).toBeInTheDocument();
  });

  test('renders language section', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Idioma')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Inglés')).toBeInTheDocument();
  });

  test('shows admin-only section for admin users', () => {
    render(
      <div>
        <Settings />
      </div>
    );

    expect(screen.getByText('Configuración Avanzada')).toBeInTheDocument();
    expect(screen.getByText('Logs del Sistema')).toBeInTheDocument();
  });
});
