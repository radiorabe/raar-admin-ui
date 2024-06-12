describe("access codes", () => {
  beforeEach(() => {
    window.localStorage.setItem("admin_token", "42");

    cy.intercept("GET", "/api/login", {
      fixture: "login/user.json",
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "/api/admin/access_codes?sort=expires_at&page%5Bsize%5D=500",
      {
        fixture: "access_codes/access_codes.json",
        statusCode: 200,
      },
    );
  });

  it("opens access_codes", function () {
    cy.visit("/access_codes", { failOnStatusCode: false });

    cy.get("sd-access-codes-init h1").should("have.text", "Zugangscodes");
    cy.get("aside .list-group .list-group-item").should("have.length", 13);
    cy.get("sd-access-codes-init table tbody tr").should("have.length", 13);

    cy.intercept("GET", "/api/admin/access_codes/68", {
      fixture: "access_codes/april.json",
      statusCode: 200,
    });

    cy.get(".list-group-item").contains("Bis 15.04.2022").click();
    cy.get(".list-group-item")
      .contains("Bis 15.04.2022")
      .should("have.class", "active");
    cy.get(".content h1").should("have.text", "Bis 15.04.2022");
    cy.get(".well").should("contain", "7rsrgf");
    cy.get("#expires_at").should("have.value", "15.04.2022");

    // update date
    cy.intercept("PATCH", "/api/admin/access_codes/68", {
      fixture: "access_codes/april_edit.json",
      statusCode: 200,
    });
    cy.get("#expires_at").clear().type("16.04.2022");
    cy.get(".btn-primary").contains("Speichern").click();
    cy.get(".content h1").should("have.text", "Bis 16.04.2022");
    cy.get(".list-group-item")
      .contains("Bis 16.04.2022")
      .should("have.class", "active");
  });

  it("adds and deletes new access code", function () {
    cy.visit("/access_codes", { failOnStatusCode: false });

    cy.get("a.btn-add").click();
    cy.get(".content h1").should("have.text", "Neuer Zugangscode");
    cy.get("#expires_at").type("15.04.2020");

    cy.intercept("POST", "/api/admin/access_codes", {
      fixture: "access_codes/new.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/access_codes/42", {
      fixture: "access_codes/new.json",
      statusCode: 200,
    });

    cy.get(".btn-primary").click();

    cy.get("#notification .alert-info").should(
      "contain",
      "Der Eintrag wurde erfolgreich gespeichert",
    );
    cy.get("#notification .alert-info .close").click();
    cy.get("#notification").should("have.class", "remove");
    cy.get("aside .list-group .list-group-item").should("have.length", 14);

    cy.get(".list-group-item:first-child")
      .contains("15.04.2020")
      .should("have.class", "active");
    cy.get("sd-access-code-form h1").should("have.text", "Bis 15.04.2020");
    cy.get(".well").should("contain", "abcdef");

    cy.on("window:confirm", (message) => {
      expect(message).to.match(/Willst du .* wirklich löschen\?/);
      return true;
    });
    cy.intercept("DELETE", "/api/admin/access_codes/42", {
      statusCode: 204,
    });
    cy.get("sd-access-code-form > form .btn-danger")
      .contains("Löschen")
      .click();
    cy.get(".alert-info").should("contain", "Der Eintrag wurde gelöscht");
    cy.get("sd-access-codes-init").should("exist");

    cy.get("aside .list-group .list-group-item").should("have.length", 13);
    cy.get("sd-access-codes-init table tbody tr").should("have.length", 13);
  });
});
