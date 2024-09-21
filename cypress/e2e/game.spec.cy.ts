describe("Game spec", () => {
  it("should redirect to the game component url", () => {
    cy.visit("/");
    cy.url().should("match", /game$/);
  });

  it("should start the round", () => {
    cy.visit("/game");
    cy.get("[data-testid=start-button]").click();
    cy.get("[data-testid=round-number]").should("have.text", "1");
  });
});
