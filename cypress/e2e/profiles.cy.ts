describe("profiles", () => {
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

  it("searches and opens profile", function () {
    cy.visit("/profiles", { failOnStatusCode: false });

    cy.get("h1").should("have.text", "Profile");
    cy.get("aside .list-group .list-group-item").should("have.length", 3);

    cy.intercept("GET", "/api/admin/profiles/178335203", {
      fixture: "profiles/important.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/profiles/178335203/archive_formats", {
      fixture: "archive_formats/important.json",
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "/api/admin/profiles/178335203/archive_formats/143504119/downgrade_actions",
      {
        fixture: "archive_formats/important_mp3_actions.json",
        statusCode: 200,
      }
    );
    cy.intercept(
      "GET",
      "/api/admin/profiles/178335203/archive_formats/582437164/downgrade_actions",
      {
        fixture: "archive_formats/important_flac_actions.json",
        statusCode: 200,
      }
    );

    cy.get(".list-group-item").contains("Important").click();

    cy.get(".list-group-item")
      .contains("Important")
      .should("have.class", "active");
    cy.get("sd-show-form h1").should("have.text", "Important");
    cy.get("#details").should("have.value", "Very important broadcasts");

    cy.get(".accordion .panel").should("have.length", 2);
    cy.get(".accordion .panel:last-child").should("have.text", "MP3");
    cy.get(".accordion .panel:first-child .button").click();
    cy.get(".accordion .panel:first-child").should("have.class", "panel-open");
    cy.get(".accordion .panel:last-child .button").click();
    cy.get(".accordion .panel:first-child").should(
      "not.have.class",
      "panel-open"
    );
    cy.get(".accordion .panel:last-child").should("have.class", "panel-open");
  });
});
