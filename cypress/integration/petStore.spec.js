/// <reference types="cypress"/>

describe('Testes PetStore', () => {
    
    context('Dado que acesso a página do JPetStore', () => {
        
        beforeEach(() => {
            cy.visitarPaginaPetStore()
        });

        context('Quando digitar o username e password e clicar em login', () => {
            
            beforeEach(() => {
                cy.login("DDLE", "12345")
            });

            it('Então estarei logado na minha conta', () => {
                cy.verificaLogin()
            });

            context('Quando clicar em MyAcount', () => {
                
                beforeEach(() => {
                    cy.acessaPaginaMyAccount()
                });

                it('Então verei a página da minha conta', () => {
                    cy.verificaPaginaMyAccount()
                });

                context('Quando clicar em My Orders e tiver um pedido feito hoje', () => {

                    beforeEach(() => {
                        cy.acessaPedidoFeitoHoje()
                    });
    
                    it('Então verei um pedido com a data de hoje', () => {
                        cy.verificaPedidoFeitoHoje()
                    });
    
                    context('Quando clicar no pedido', () => {

                        beforeEach(() => {
                            cy.acessaDetalhePedido()
                        });

                        it('Então verei os detalhes do pedido', () => {
                            cy.verificaDetalhesPedidoFeitoHoje()
                        });
                    })
                });

                context('Quando clicar em My Orders e tiver mais de um pedido feito', () => {

                    beforeEach(() => {
                        cy.acessaPedidos()
                    });

                    it('Então verei três pedidos com datas diferentes', () => {
                        cy.verificaPedidosDatasDiferentes()
                    });
                });
            });
        });
    });
});