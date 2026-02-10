import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Orders from '../Orders';

// Mock del useAuth
const mockUser = {
  id: 2,
  username: 'user',
  email: 'user@abc.com',
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

describe('Orders Component', () => {
  test('renders orders page', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('Pedidos')).toBeInTheDocument();
    expect(screen.getByText('Visualización y gestión de pedidos')).toBeInTheDocument();
  });

  test('renders orders table', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Cliente')).toBeInTheDocument();
    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
  });

  test('renders filter options', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
    expect(screen.getByText('Completados')).toBeInTheDocument();
    expect(screen.getByText('Cancelados')).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByPlaceholderText('Buscar pedidos...')).toBeInTheDocument();
  });

  test('displays order status badges', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.getByText('En Proceso')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
    expect(screen.getByText('Cancelado')).toBeInTheDocument();
  });

  test('shows create order button', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('Nuevo Pedido')).toBeInTheDocument();
  });

  test('displays order details', () => {
    render(
      <div>
        <Orders />
      </div>
    );

    expect(screen.getByText('Ver Detalles')).toBeInTheDocument();
  });
});
