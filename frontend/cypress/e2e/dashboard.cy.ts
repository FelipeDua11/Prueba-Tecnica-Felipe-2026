/// <reference types="cypress" />

describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="username-input"]').type('admin');
    cy.get('[data-testid="password-input"]').type('password');
    cy.get('[data-testid="submit-button"]').click();
    
    // Wait for dashboard to load
    cy.url().should('not.include', '/login');
  });

  it('should display dashboard header', () => {
    cy.get('h1').should('contain', 'Dashboard');
    cy.get('.dashboard-header').should('be.visible');
  });

  it('should display user information', () => {
    cy.get('.user-info').should('be.visible');
    cy.get('.user-info').should('contain', 'Información del Usuario');
    cy.get('.user-info').should('contain', 'admin');
    cy.get('.user-info').should('contain', 'Admin');
  });

  it('should display dashboard cards', () => {
    cy.get('.dashboard-cards').should('be.visible');
    cy.get('.dashboard-cards').should('contain', 'Usuarios');
    cy.get('.dashboard-cards').should('contain', 'Pedidos');
    cy.get('.dashboard-cards').should('contain', 'Pagos');
    cy.get('.dashboard-cards').should('contain', 'API Pública');
  });

  it('should display microservices status', () => {
    cy.get('.microservices').should('be.visible');
    cy.get('.microservices').should('contain', 'Microservicios');
    cy.get('.microservices').should('contain', '✅ Usuarios Service');
    cy.get('.microservices').should('contain', '✅ Pedidos Service');
    cy.get('.microservices').should('contain', '✅ Pagos Service');
    cy.get('.microservices').should('contain', '✅ API Gateway');
  });

  it('should navigate to users section', () => {
    cy.get('.dashboard-cards').contains('Usuarios').click();
    cy.url().should('include', '/users');
  });

  it('should navigate to orders section', () => {
    cy.get('.dashboard-cards').contains('Pedidos').click();
    cy.url().should('include', '/orders');
  });

  it('should navigate to payments section', () => {
    cy.get('.dashboard-cards').contains('Pagos').click();
    cy.url().should('include', '/payments');
  });

  it('should navigate to API data section', () => {
    cy.get('.dashboard-cards').contains('API Pública').click();
    cy.url().should('include', '/api-data');
  });

  it('should toggle theme', () => {
    cy.get('.theme-toggle').should('be.visible');
    cy.get('.theme-toggle').click();
    // Check if theme changed (you may need to add specific theme indicators)
    cy.get('body').should('have.class', 'dark');
  });
});
