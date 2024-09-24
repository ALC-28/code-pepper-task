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

  it("should change the resource type", () => {
    cy.visit("/game");
    const resourceButton = cy.get("[data-testid=resource-button]").eq(1);
    resourceButton.click();
    // TODO: match cards type
  });
});
