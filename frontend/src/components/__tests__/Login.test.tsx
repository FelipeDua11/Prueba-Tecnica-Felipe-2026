import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock del useAuth
const mockLogin = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: () => ({
    login: mockLogin,
    logout: jest.fn(),
    isAuthenticated: false,
    user: null
  })
}));

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText('ABC Company - Login')).toBeInTheDocument();
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('shows demo credentials', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText('Credenciales de Demo:')).toBeInTheDocument();
    expect(screen.getByText('Admin: admin / password')).toBeInTheDocument();
    expect(screen.getByText('Usuario: user / password')).toBeInTheDocument();
  });

  test('updates input values when typing', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpass');
  });

  test('submits form with correct credentials', async () => {
    mockLogin.mockResolvedValue(true);
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: 'admin',
        password: 'password'
      });
    });
  });

  test('shows error message on failed login', async () => {
    mockLogin.mockResolvedValue(false);
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(/Usuario o contraseña incorrectos/);
    });
  });
});
