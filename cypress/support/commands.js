function dataAtualFormatada() {
    let date = new Date()

    let dia = date.getDate() < 10 ? '0' + date.getDate : date.getDate()
    let mes = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let ano = date.getFullYear()

    return `${ano}/${mes}/${dia}`
}

Cypress.Commands.add('login', (email, password) => {
    cy.get("#MenuContent").contains("Sign In").click()
    cy.get('[name="username"]').type(email)
    cy.get('[name="password"]').clear().type(password)
    cy.get('[name="signon"]').click()
})

Cypress.Commands.add('visitarPaginaPetStore', () => {
    cy.visit('https://petstore.octoperf.com/actions/Catalog.action');
})

Cypress.Commands.add('verificaLogin', () => {
    cy.url().should('be.equal', "https://petstore.octoperf.com/actions/Catalog.action")
})

Cypress.Commands.add('acessaPaginaMyAccount', () => {
    cy.get("#MenuContent").contains("My Account").click()
})

Cypress.Commands.add('verificaPaginaMyAccount', () => {
    cy.url().should('be.equal', "https://petstore.octoperf.com/actions/Account.action?editAccountForm=")
})

Cypress.Commands.add('acessaPedidoFeitoHoje', () => {
    cy.intercept('GET', '**/actions/Order.action?listOrders=', { fixture: 'cenario01' }).as('getCenario01')
    cy.get("#Catalog").contains("My Orders").click()
})

Cypress.Commands.add('verificaPedidoFeitoHoje', () => {
    cy.get("#Content table tbody tr").should('have.length', 1)
    cy.get('table [name="tdDate"]').invoke('text').then(data => {

        let dataHoraPedido = data.split(' ')
        let dataCompletaPedido = dataHoraPedido[0]
        let dataAtual = dataAtualFormatada()

        expect(dataAtual).to.eq(dataCompletaPedido)
    })
})

Cypress.Commands.add('acessaDetalhePedido', () => {
    cy.intercept('GET', '**/actions/Order.action?viewOrder=74897;orderId=74897', { fixture: 'detalhesCenario01' }).as('getDetalhesCenario01')
    cy.get('#Content table tbody [name="tdOrderId"]').click()
})

Cypress.Commands.add('verificaDetalhesPedidoFeitoHoje', () => {
    cy.get('#Catalog table tr [align="center"]').invoke('text').then(text => {

        let dadosPedidos = text.split(' ')
        let orderId = dadosPedidos[1]
        let dataPedido = dadosPedidos[2]

        expect(orderId).to.eq("#74897")
        expect(dataPedido).to.eq("2022/03/22")
    })
})

Cypress.Commands.add('acessaPedidos', () => {
    cy.intercept('GET', '**/actions/Order.action?listOrders=', { fixture: 'cenario02' }).as('getCenario02')
    cy.get("#Catalog").contains("My Orders").click()
})

Cypress.Commands.add('verificaPedidosDatasDiferentes', () => {
    let arrayDatas = []
    
    cy.get("#Content table tbody tr").should('have.length', 3)
    cy.get('#Content table tbody tr [name="tdDate"]').each((element) => {
        cy.get(element).invoke('text').then(text => {

            let dataHora = text.split(' ')
            let data = dataHora[0]
            arrayDatas.push(`${data}`)
        })
    }).then(() => {

        let setDatas = new Set(arrayDatas)

        expect(setDatas.size).to.eq(arrayDatas.length)
    })
})