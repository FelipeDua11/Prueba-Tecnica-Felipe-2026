/// <reference types="cypress" />

describe('Login E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('h2').should('contain', 'ABC Company - Login');
  });

  it('should display login form', () => {
    cy.get('[data-testid="username-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="submit-button"]').should('be.visible');
  });

  it('should show demo credentials', () => {
    cy.get('.demo-info').should('contain', 'Credenciales de Demo:');
    cy.get('.demo-info').should('contain', 'Admin: admin / password');
    cy.get('.demo-info').should('contain', 'Usuario: user / password');
  });

  it('should login successfully with admin credentials', () => {
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="submit-button"]').click();
    
    // Wait for navigation and check URL
    cy.url().should('include', '/dashboard');
    
    // Wait for dashboard to load and check for h2
    cy.get('h2', { timeout: 10000 }).should('contain', 'Dashboard');
  });

  it('should login successfully with user credentials', () => {
    cy.get('[data-testid="username-input"]').type('user');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="submit-button"]').click();
    
    // Wait for navigation and check URL
    cy.url().should('include', '/dashboard');
    
    // Wait for dashboard to load
    cy.get('h2', { timeout: 10000 }).should('contain', 'Dashboard');
  });

  it('should show error message with invalid credentials', () => {
    cy.get('[data-testid="username-input"]').type('wrong');
    cy.get('[data-testid="password-input"]').type('wrong');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="error-message"]', { timeout: 5000 }).should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Usuario o contraseña incorrectos');
  });

  it('should validate required fields', () => {
    cy.get('[data-testid="submit-button"]').click();
    
    // Check if form validation works
    cy.get('[data-testid="username-input"]').should('have.attr', 'required');
    cy.get('[data-testid="password-input"]').should('have.attr', 'required');
  });
});
