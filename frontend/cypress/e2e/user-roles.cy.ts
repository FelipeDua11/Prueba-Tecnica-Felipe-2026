/// <reference types="cypress" />

describe('User Roles E2E Tests', () => {
  describe('Admin User', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get('[data-testid="username-input"]').type('admin');
      cy.get('[data-testid="password-input"]').type('password');
      cy.get('[data-testid="submit-button"]').click();
      cy.url().should('not.include', '/login');
    });

    it('should have access to all features', () => {
      cy.get('.dashboard-cards').should('contain', 'Usuarios');
      cy.get('.dashboard-cards').should('contain', 'Pedidos');
      cy.get('.dashboard-cards').should('contain', 'Pagos');
      cy.get('.dashboard-cards').should('contain', 'API Pública');
    });

    it('should show admin avatar in sidebar', () => {
      cy.get('.menu-button').click();
      cy.get('.sidebar').should('contain', '👑');
    });

    it('should have access to settings', () => {
      cy.get('.menu-button').click();
      cy.get('.sidebar').contains('Configuración').click();
      cy.url().should('include', '/settings');
    });

    it('should see admin-only sections in settings', () => {
      cy.get('.menu-button').click();
      cy.get('.sidebar').contains('Configuración').click();
      cy.get('.settings-container').should('contain', 'Configuración Avanzada');
      cy.get('.settings-container').should('contain', 'Logs del Sistema');
    });
  });

  describe('Regular User', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
      cy.get('[data-testid="username-input"]').type('user');
      cy.get('[data-testid="password-input"]').type('password');
      cy.get('[data-testid="submit-button"]').click();
      cy.url().should('not.include', '/login');
    });

    it('should have limited access to features', () => {
      cy.get('.dashboard-cards').should('contain', 'Pedidos');
      cy.get('.dashboard-cards').should('contain', 'Pagos');
      cy.get('.dashboard-cards').should('contain', 'API Pública');
    });

    it('should show user avatar in sidebar', () => {
      cy.get('.menu-button').click();
      cy.get('.sidebar').should('contain', '👤');
    });

    it('should not have access to admin features', () => {
      cy.get('.menu-button').click();
      cy.get('.sidebar').should('not.contain', 'Usuarios');
      cy.get('.sidebar').should('not.contain', 'Configuración');
    });

    it('should not see admin sections in settings', () => {
      // Try to access settings directly
      cy.visit('http://localhost:3000/settings');
      cy.get('.settings-container').should('not.contain', 'Configuración Avanzada');
      cy.get('.settings-container').should('not.contain', 'Logs del Sistema');
    });
  });

  it('should redirect unauthorized users to login', () => {
    // Try to access protected routes without login
    cy.visit('http://localhost:3000/dashboard');
    cy.url().should('include', '/login');
    
    cy.visit('http://localhost:3000/users');
    cy.url().should('include', '/login');
    
    cy.visit('http://localhost:3000/orders');
    cy.url().should('include', '/login');
    
    cy.visit('http://localhost:3000/payments');
    cy.url().should('include', '/login');
  });
});
