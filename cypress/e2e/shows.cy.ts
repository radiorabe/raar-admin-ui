describe("shows", () => {
  beforeEach(() => {
    window.localStorage.setItem("admin_token", "42");

    cy.intercept("GET", "/api/login", {
      fixture: "login/user.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/shows?sort=name&page%5Bsize%5D=500", {
      fixture: "shows/shows.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/profiles?sort=name&page%5Bsize%5D=500", {
      fixture: "profiles/profiles.json",
      statusCode: 200,
    });
  });

  it("searches and opens shows", function () {
    cy.intercept("GET", "/api/admin/shows/894544321", {
      fixture: "shows/existing_show.json",
      statusCode: 200,
    });

    cy.visit("/shows", { failOnStatusCode: false });

    cy.get("sd-shows-init h1").should("have.text", "Sendungen");
    cy.get("aside .list-group .list-group-item").should("have.length", 61);

    cy.get("#query").type("info");
    cy.get("aside .list-group .list-group-item").should("have.length", 4);
    cy.get("aside .list-group .list-group-item:first-child").should(
      "have.text",
      "\n        Info\n      "
    );
    cy.get(".form-control-feedback > .glyphicon-remove").click();
    cy.get("aside .list-group .list-group-item").should("have.length", 61);

    cy.get(".list-group-item").contains("All Big Band").click();
    cy.get(".list-group-item")
      .contains("All Big Band")
      .should("have.class", "active");
    cy.get(".content h1").should("have.text", "All Big Band");
    cy.get("#details").should("have.value", "Bla bla bla");
  });

  it("adds new show", function () {
    cy.intercept("GET", "/api/admin/shows/894544321", {
      fixture: "shows/existing_show.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/shows/42", {
      fixture: "shows/new_show.json",
      statusCode: 200,
    });
    cy.intercept("POST", "/api/admin/shows", {
      fixture: "shows/new_show.json",
      statusCode: 200,
    });

    cy.visit("/shows", { failOnStatusCode: false });

    cy.get("a.btn-add").click();
    cy.get(".content h1").should("have.text", "Neue Sendung");
    cy.get("#name").type("Test Send");
    cy.get("#details").type("Mehr Infos");
    cy.get(".btn-primary").click();

    cy.get("#notification .alert-info").should(
      "contain",
      "Der Eintrag wurde erfolgreich gespeichert"
    );

    cy.get(".list-group-item")
      .contains("Test Send")
      .should("have.class", "active");
    cy.get("sd-show-form h1").should("have.text", "Test Send");

    cy.get(".list-group-item").contains("All Big Band").click();
    cy.get("sd-show-form h1").should("have.text", "All Big Band");
    cy.get("#details").should("have.value", "Bla bla bla");
  });
});
