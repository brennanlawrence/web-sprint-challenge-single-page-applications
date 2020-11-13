describe("Pizza Tests", function() {
    it("tests", function() {
        cy.visit("index.html")
        cy.get(".makePizza").click();
    });

    it("Can input text in name and instructions boxes", function() {
        cy.get(".name").type("Grok");
        cy.get(".instructions").type("Grok is Gluten Free");
    });

    it("Can select multiple toppings", function() {
        cy.get(".cheese").check();
        cy.get(".sauce").check();
        cy.get(".meat").check();
    });

    it("Can submit form", function() {
        cy.get("form").submit();
    });
})