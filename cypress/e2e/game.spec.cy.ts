describe("Game spec", () => {
  it("should redirect to the game component url", () => {
    cy.visit("/");
    cy.url().should("match", /game$/);
  });
});
