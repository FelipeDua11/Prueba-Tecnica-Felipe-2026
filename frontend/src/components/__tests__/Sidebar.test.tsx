import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

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

describe('Sidebar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders sidebar when open', () => {
    jest.mock('../../contexts/AuthContext', () => ({
      AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      useAuth: () => ({
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        user: mockAdminUser
      })
    }));

    const mockOnClose = jest.fn();
    
    render(
      <div>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </div>
    );

    expect(screen.getByText('ABC Company')).toBeInTheDocument();
    expect(screen.getByText(mockAdminUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockAdminUser.role)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    jest.mock('../../contexts/AuthContext', () => ({
      AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      useAuth: () => ({
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        user: mockAdminUser
      })
    }));

    const mockOnClose = jest.fn();
    
    render(
      <div>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </div>
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('shows correct user avatar based on role', () => {
    jest.mock('../../contexts/AuthContext', () => ({
      AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      useAuth: () => ({
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        user: mockAdminUser
      })
    }));

    const mockOnClose = jest.fn();
    
    render(
      <div>
        <Sidebar isOpen={true} onClose={mockOnClose} />
      </div>
    );

    expect(screen.getByText('👑')).toBeInTheDocument();
  });
});
