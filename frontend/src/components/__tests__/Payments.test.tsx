import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Payments from '../Payments';

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

describe('Payments Component', () => {
  test('renders payments page', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Pagos')).toBeInTheDocument();
    expect(screen.getByText('Historial y estado de pagos')).toBeInTheDocument();
  });

  test('renders payments table', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Pedido')).toBeInTheDocument();
    expect(screen.getByText('Monto')).toBeInTheDocument();
    expect(screen.getByText('Método')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
  });

  test('renders payment methods', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Tarjeta de Crédito')).toBeInTheDocument();
    expect(screen.getByText('PayPal')).toBeInTheDocument();
    expect(screen.getByText('Transferencia Bancaria')).toBeInTheDocument();
  });

  test('renders filter options', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Filtrar por')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Exitosos')).toBeInTheDocument();
    expect(screen.getByText('Fallidos')).toBeInTheDocument();
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByPlaceholderText('Buscar pagos...')).toBeInTheDocument();
  });

  test('displays payment status badges', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Exitoso')).toBeInTheDocument();
    expect(screen.getByText('Fallido')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.getByText('Procesando')).toBeInTheDocument();
  });

  test('shows payment statistics', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Estadísticas de Pagos')).toBeInTheDocument();
    expect(screen.getByText('Total Pagado')).toBeInTheDocument();
    expect(screen.getByText('Pagos Exitosos')).toBeInTheDocument();
    expect(screen.getByText('Pagos Fallidos')).toBeInTheDocument();
  });

  test('displays export options', () => {
    render(
      <div>
        <Payments />
      </div>
    );

    expect(screen.getByText('Exportar')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('Excel')).toBeInTheDocument();
    expect(screen.getByText('CSV')).toBeInTheDocument();
  });
});
