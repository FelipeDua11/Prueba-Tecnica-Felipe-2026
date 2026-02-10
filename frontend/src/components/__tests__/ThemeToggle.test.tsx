import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from '../ThemeToggle';

describe('ThemeToggle Component', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders theme toggle button', () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Cambiar a modo oscuro');
  });

  test('shows moon icon for light theme', () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);
    
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  test('shows sun icon for dark theme', () => {
    render(<ThemeToggle theme="dark" onToggle={mockOnToggle} />);
    
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  test('calls onToggle when clicked', () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('has correct title for dark theme', () => {
    render(<ThemeToggle theme="dark" onToggle={mockOnToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Cambiar a modo claro');
  });
});
