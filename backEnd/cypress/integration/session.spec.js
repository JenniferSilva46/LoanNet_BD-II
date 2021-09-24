describe("My First Test", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5500/src/pages/registerUser/registerUser.html");
    });
    it("Cadastrando usuário", () => {
        cy.intercept({
            method: "POST",
            url: "http://0.0.0.0:8080/user/create",
        }).as("createUser");

        const novoUsuario = `Novo usuario - ${new Date().toISOString()}`;

        cy.get("#name").type(novoUsuario);
        cy.get("#email").type(`novouser@gmail.com`);
        cy.get("#password").type("654123");
        cy.get("#tel").type("654123");
        cy.get("#submit").click();
    });

    it("Redirecionando para pagina de login e logando usuário", () => {
        cy.get("#login").click();
        cy.intercept({
            method: "POST",
            url: "http://0.0.0.0:8080/user/login",
        }).as("loginUser");

        cy.get("#email").type(`novouser@gmail.com`);
        cy.get("#password").type("654123");

        cy.get("#log").click();
    });
})