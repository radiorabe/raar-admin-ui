describe("playback formats", () => {
  beforeEach(() => {
    window.localStorage.setItem("admin_token", "42");

    cy.intercept("GET", "/api/login", {
      fixture: "login/user.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/profiles?sort=name&page%5Bsize%5D=500", {
      fixture: "profiles/profiles.json",
      statusCode: 200,
    });
  });

  it("searches and opens playback formats", function () {
    cy.visit("/playback_formats", { failOnStatusCode: false });
  });
});
