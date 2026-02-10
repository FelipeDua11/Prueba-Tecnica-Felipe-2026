/// <reference types="cypress" />

describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    // Login as admin
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should('not.include', '/login');
  });

  it('should open and close sidebar', () => {
    // Open sidebar (assuming there's a menu button)
    cy.get('.menu-button').click();
    cy.get('.sidebar').should('have.class', 'open');
    
    // Close sidebar
    cy.get('.close-button').click();
    cy.get('.sidebar').should('not.have.class', 'open');
  });

  it('should display user info in sidebar', () => {
    cy.get('.menu-button').click();
    cy.get('.sidebar').should('contain', 'ABC Company');
    cy.get('.sidebar').should('contain', 'admin');
    cy.get('.sidebar').should('contain', 'Admin');
    cy.get('.sidebar').should('contain', '👑'); // Admin avatar
  });

  it('should show admin-only menu items for admin user', () => {
    cy.get('.menu-button').click();
    cy.get('.sidebar').should('contain', 'Usuarios');
    cy.get('.sidebar').should('contain', 'Configuración');
  });

  it('should navigate through menu items', () => {
    cy.get('.menu-button').click();
    
    // Navigate to Users
    cy.get('.sidebar').contains('Usuarios').click();
    cy.url().should('include', '/users');
    
    // Navigate to Orders
    cy.get('.menu-button').click();
    cy.get('.sidebar').contains('Pedidos').click();
    cy.url().should('include', '/orders');
    
    // Navigate to Payments
    cy.get('.menu-button').click();
    cy.get('.sidebar').contains('Pagos').click();
    cy.url().should('include', '/payments');
  });

  it('should logout successfully', () => {
    cy.get('.menu-button').click();
    cy.get('.sidebar').contains('Cerrar Sesión').click();
    
    // Should redirect to login
    cy.url().should('include', '/login');
    cy.get('h2').should('contain', 'ABC Company - Login');
  });

  it('should handle responsive navigation', () => {
    // Test on mobile viewport
    cy.viewport(375, 667);
    cy.get('.menu-button').should('be.visible');
    cy.get('.sidebar').should('not.have.class', 'open');
    
    // Open sidebar on mobile
    cy.get('.menu-button').click();
    cy.get('.sidebar').should('have.class', 'open');
    
    // Test on desktop viewport
    cy.viewport(1280, 720);
    cy.get('.sidebar').should('be.visible');
  });
});
