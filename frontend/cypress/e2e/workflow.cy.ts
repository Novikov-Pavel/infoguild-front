describe('Workflow editor', () => {
  beforeEach(() => {
    cy.intercept('GET', '/workflow/get*', {
      statusCode: 200,
      body: {
        name: 'wf1',
        steps: [
          {
            initialIndex: 0,
            name: 'Закупка',
            x: 40,
            y: 40,
            nextSteps: [1],
            color: '#666666',
          },
          {
            initialIndex: 1,
            name: 'Доставка',
            x: 280,
            y: 40,
            nextSteps: [],
            color: '#0044aa',
          },
        ],
      },
    }).as('getWorkflow');

    cy.visit('/');
    cy.wait('@getWorkflow');
  });

  it('shows table and diagram', () => {
    cy.get('[data-testid="workflow-page"]').should('exist');
    cy.get('[data-testid="workflow-table"]').should('exist');
    cy.get('[data-testid="workflow-diagram"]').should('exist');
    cy.get('[data-testid="workflow-row"]').should('have.length', 2);
    cy.get('[data-testid="workflow-block"]').should('have.length', 2);
  });

  it('highlights step on row click', () => {
    cy.get('[data-testid="workflow-row"]').first().click();
    cy.get('[data-testid="workflow-block"]').first().should('have.attr', 'data-selected', 'true');
  });

  it('filters table rows by search', () => {
    cy.get('[data-testid="workflow-search"]').type('закуп');
    cy.get('[data-testid="workflow-row"]').should('have.length', 1);
  });
});
