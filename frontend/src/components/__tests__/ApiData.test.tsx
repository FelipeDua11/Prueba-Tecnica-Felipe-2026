import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApiData from '../ApiData';

// Mock fetch global
global.fetch = jest.fn();

describe('ApiData Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders api data component', () => {
    render(<ApiData />);
    
    expect(screen.getByText('API Pública')).toBeInTheDocument();
    expect(screen.getByText('Integración con servicios externos')).toBeInTheDocument();
  });

  test('renders tabs for posts and users', () => {
    render(<ApiData />);
    
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
  });

  test('switches to users tab when clicked', async () => {
    render(<ApiData />);
    
    const usersTab = screen.getByText('Usuarios');
    fireEvent.click(usersTab);
    
    await waitFor(() => {
      expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument();
    });
  });

  test('shows loading state initially', () => {
    const mockFetch = fetch as jest.Mock;
    mockFetch.mockImplementation(() => 
      Promise.resolve({ json: () => Promise.resolve([]) })
    );
    
    render(<ApiData />);
    
    expect(screen.getByText('Cargando posts...')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    const mockFetch = fetch as jest.Mock;
    mockFetch.mockRejectedValue(new Error('Network error'));
    
    render(<ApiData />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar datos/)).toBeInTheDocument();
    });
  });
});
