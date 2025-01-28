beforeEach(() => {
  cy.visit('./src/index.html')
});
describe('Central de Atendimento ao Cliente TAT', () => {

  it('verificar o título da aplicação', () => {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    //Preenchimento do form
    cy.get('#firstName').type('firstName', { delay: 0 })
    cy.get('#lastName').type('lastName', {delay: 0})
    cy.get('#email').type('test@mail.com', {delay: 0})
    cy.get('#open-text-area').type('preenche os campos obrigatórios e envia o formulário', {delay: 0})

    //Assert: Preenchimento do form
    cy.get('#firstName').should('have.value', 'firstName')
    cy.get('#lastName').should('have.value', 'lastName')
    cy.get('#email').should('have.value', 'test@mail.com')
    cy.get('#open-text-area').should('have.value', 'preenche os campos obrigatórios e envia o formulário')

    //Envio do form
    cy.get('.button').click()

    //Assert: Envio do form
    cy.get('.success')
    .should('be.visible')
    .and('contain.text', 'Mensagem enviada com sucesso.')
  });
});