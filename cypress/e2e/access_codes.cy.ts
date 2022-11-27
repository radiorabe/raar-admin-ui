describe("access codes", () => {
  beforeEach(() => {
    window.localStorage.setItem("admin_token", "42");

    cy.intercept("GET", "/api/login", {
      fixture: "login/user.json",
      statusCode: 200,
    });
  });

  it("searches and opens access_codes", function () {
    cy.visit("/access_codes", { failOnStatusCode: false });
  });
});
