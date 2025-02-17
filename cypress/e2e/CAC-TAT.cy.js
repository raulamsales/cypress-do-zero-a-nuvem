describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });

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
    cy.get('button[type="submit"]').click()

    //Assert: Envio do form
    cy.get('.success').should('be.visible').and('contain.text', 'Mensagem enviada com sucesso.')
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('firstName', { delay: 0 })
    cy.get('#lastName').type('lastName', {delay: 0})
    cy.get('#email').type('failMail', {delay: 0})
    cy.get('#open-text-area').type('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', {delay: 0})
    
    //Envio do form
    cy.get('button[type="submit"]').click()

    //Assert: Falha no envio do form
    cy.get('.error')
    .should('be.visible')
  });
  
  it('teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone')
    .type('123')
    //Assert: invoke pega o valor do campo, e should confirma que so tem numero inteiro com "/^\d+$/"
    .invoke('val')
    .should('match', /^\d+$/)
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('test')
    cy.get('#lastName').type('test')
    cy.get('#email').type('test@mail.com')
    cy.get('#open-text-area').type('testmsg')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    //Assert
    cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('test').should('have.value', 'test')
    cy.get('#lastName').type('test').should('have.value', 'test')
    cy.get('#email').type('test@mail.com').should('have.value', 'test@mail.com')
    cy.get('#phone').type('123').should('have.value', '123')

    // Limpa valores com Assert
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('test', 'test', 'test@mail.com', 'test')
  });

  it('Exercício extra 8', () => {
    cy.fillMandatoryFieldsAndSubmit('test', 'test', 'test@mail.com', 'test',)
    //cy.contains('button', 'Enviar').click() Esse comando ja existe no commands.js
    cy.contains('.success', 'Mensagem enviada com sucesso.')
  });

  // AULA 3
  it('Ex - Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('Cursos')

    cy.get('#product').should('have.value', 'cursos')
  });

  it('Ex1 - seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    
    cy.get('#product').should('have.value', 'mentoria')
  });

  it('Ex2 - seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(4)
    .should('have.value', 'youtube')
  });
  
  // Aula 4
  it('Ex - marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  });

  it('Ex1 - marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($radio) => {
      cy.wrap($radio)
      .check()
      .should('be.checked')
    })
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should('have.prop', 'files')
    .its('0.name')
    .should('be.equal', 'example.json')
    // .should((input) => {
    //   expect(input[0].files[0].name)
    //   .equal('example.json')
    //})
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should('have.prop', 'files')
    .its('0.name')
    .should('be.equal', 'example.json')
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('testName')
    cy.get('#file-upload')
    .selectFile('@testName')
    .should('have.prop' , 'files')
    .its('0.name')
    .should('be.equal', 'example.json')
    //cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  });

  it('testa a página da política de privacidade de forma independente', () => {
    cy.get('a[href="privacy.html"]')
    .invoke('removeAttr', 'target')
    .should('not.have.attr', 'target')
    
    cy.get('a[href="privacy.html"]').click()
    
    cy.get('#title')
    .should('contain', 'CAC TAT - Política de Privacidade')
  });

  it('Seção 13: Avançando no uso do Cypress', () => {
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  });


  Cypress._.times(3, () =>{
    it('lodash (Cypress._)', () => {
      cy.get('#firstName').type('teste').should('have.value', 'teste')
    });
  });

  it('Invoque atributos e métodos de elementos com o comando .invoke()', () => {
    cy.clock()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('contain', 'Valide os campos obrigatórios!')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
    cy.get('.error').invoke('show').should('be.visible')
  });

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#firstName').invoke('val', 'teste').should('have.value', 'teste')
  });

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('request')
    .its('status')
    .should('be.equal', 200)

    cy.get('@request')
    .its('statusText')
    .should('contain', 'OK')

    cy.get('@request')
    .its('body')
    .should('include', 'CAC TAT')
  });

  it.only('Catfinder', () => {
    cy.get('#cat').invoke('show').should('be.visible')
  });
});