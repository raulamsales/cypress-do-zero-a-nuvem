describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verificar o título da aplicação', () => {
    cy.visit('./src/index.html')
  });
});