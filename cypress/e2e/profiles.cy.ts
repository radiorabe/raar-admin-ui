import { doesNotReject } from "assert";

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
    cy.intercept("GET", "/api/admin/audio_encodings", {
      fixture: "audio_encodings/audio_encodings.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/shows?sort=name&page%5Bsize%5D=500", {
      fixture: "shows/shows.json",
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
      fixture: "profiles/important_formats.json",
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "/api/admin/profiles/178335203/archive_formats/143504119/downgrade_actions",
      {
        fixture: "profiles/important_mp3_actions.json",
        statusCode: 200,
      }
    );
    cy.intercept(
      "GET",
      "/api/admin/profiles/178335203/archive_formats/582437164/downgrade_actions",
      {
        fixture: "profiles/important_flac_actions.json",
        statusCode: 200,
      }
    );

    cy.get("aside .list-group-item").contains("Important").click();

    cy.get("aside .list-group-item")
      .contains("Important")
      .should("have.class", "active");
    cy.get(".content h1").should("have.text", "Important");
    cy.get("#description").should("have.value", "Very important broadcasts");

    cy.get(".accordion .accordion-group").should("have.length", 2);
    cy.get(".accordion .accordion-group:first-child .panel-title").should(
      "contain",
      "FLAC"
    );
    cy.get(".accordion .accordion-group:first-child .panel-title").click();
    cy.get(".accordion .accordion-group:first-child").should(
      "have.class",
      "panel-open"
    );
    cy.get(".accordion .accordion-group:last-child .panel-title").should(
      "contain",
      "MP3"
    );
    cy.get(".accordion .accordion-group:last-child .panel-title").click();
    cy.get(".accordion .accordion-group:first-child").should(
      "not.have.class",
      "panel-open"
    );
    cy.get(".accordion .accordion-group:last-child").should(
      "have.class",
      "panel-open"
    );

    cy.get("sd-downgrade-action").should("have.length", 2);
    cy.get("sd-downgrade-action:first-child").should("contain", "Reduziere");
    cy.get("sd-downgrade-action:last-child").should("contain", "Lösche");

    cy.get(".show-list li").should("have.length", 9);
  });

  it("creates new profile", function () {
    cy.visit("/profiles", { failOnStatusCode: false });

    cy.intercept("POST", "/api/admin/profiles", {
      fixture: "profiles/test.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/profiles/42", {
      fixture: "profiles/test.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/profiles/42/archive_formats", {
      fixture: "profiles/test_formats.json",
      statusCode: 200,
    });

    cy.get("h1").should("have.text", "Profile");
    cy.get(".btn").contains("Profil erstellen").click();
    cy.get("#name").type("Test");
    cy.get("#description").type("Just a test");

    cy.get(".btn").contains("Zurücksetzen").click();
    cy.get("#name").should("have.value", "");
    cy.get("#description").should("have.value", "");

    cy.get("#name").type("Test");
    cy.get("#description").type("Just a test");
    cy.get(".btn-primary").contains("Speichern").click();

    // add archive format
    cy.get(".form-inline > select").select("mp3");
    cy.get(".accordion .accordion-group").should("have.length", 1);
    cy.get(".accordion .accordion-group:first-child .panel-title").should(
      "contain",
      "MP3"
    );
    cy.get(".form-inline > select option").should("have.length", 2);
    cy.get(".form-inline > select option").should("not.contain", "MP3");
    cy.get(".form-inline > select option").should("contain", "FLAC");

    cy.get("#max_public_bitrate").select("160");
    cy.get("#max_logged_in_bitrate").select("192");
    cy.get("#max_priviledged_bitrate").select("320");
    cy.get("#priviledged_groups").type("sendungsmachende, admins");
    cy.get("#download_permission").select("priviledged");
    cy.get("#initial_bitrate").select("256");
    cy.get(".accordion-group").should("not.contain", "Datenreduktion");

    cy.intercept("POST", "/api/admin/profiles/42/archive_formats", {
      fixture: "profiles/test_mp3.json",
      statusCode: 201,
    });

    cy.get(".accordion-group .btn-primary").contains("Speichern").click();
    cy.get("h3").should(
      "contain",
      "Archivierungsformate & Zugriffsberechtigungen"
    );
    cy.get("div").should("contain", "Keine Sendungen zugewiesen");

    // add Reduktionsschritt
    cy.get("sd-archive-format-form").should("contain", "Datenreduktion");
    cy.get("p a")
      .contains("Reduktionsschritt hinzufügen")
      .click()
      .should("not.exist");
    cy.get("sd-downgrade-action-form").should("exist");
    cy.get("sd-downgrade-action-form input[type=number]").clear();
    cy.get("sd-downgrade-action-form input[type=number]").type("6");
    cy.get("sd-downgrade-action-form #bitrate").select("160");

    cy.intercept(
      "POST",
      "/api/admin/profiles/42/archive_formats/43/downgrade_actions",
      {
        fixture: "profiles/test_mp3_downgrade.json",
        statusCode: 201,
      }
    );

    cy.get("sd-downgrade-action-form .btn-primary")
      .contains("Speichern")
      .click();
    cy.get("sd-downgrade-action-form").should("not.exist");

    cy.get("sd-downgrade-action").should("have.length", 1);
    cy.get("sd-downgrade-action").should("contain", "Reduziere nach");
    cy.get("sd-downgrade-action .downgrade-value").should("contain", "6");
    cy.get("sd-downgrade-action .downgrade-value").should(
      "contain",
      "160 kbps"
    );

    // add Löschzeitpunkt
    cy.get("a")
      .contains("Löschzeitpunkt hinzufügen")
      .click()
      .should("not.exist");
    cy.get("sd-downgrade-action-form").should("exist");
    cy.get("sd-downgrade-action-form input[type=number]").clear();
    cy.get("sd-downgrade-action-form input[type=number]").type("36");

    cy.intercept(
      "POST",
      "/api/admin/profiles/42/archive_formats/43/downgrade_actions",
      {
        fixture: "profiles/test_mp3_remove.json",
        statusCode: 201,
      }
    );

    cy.get("sd-downgrade-action-form .btn-primary")
      .contains("Speichern")
      .click();
    cy.get("sd-downgrade-action-form").should("not.exist");

    cy.get("sd-downgrade-action").should("have.length", 2);
    cy.get("sd-downgrade-action:last-child").should("contain", "Lösche nach");
    cy.get("sd-downgrade-action:last-child .downgrade-value").should(
      "contain",
      "36"
    );

    // edit Reduktionsschritt
    cy.get("sd-downgrade-action:first-child a .glyphicon-pencil").click();
    cy.get("sd-downgrade-action-form").should("exist");
    cy.get("sd-downgrade-action-form input[type=number]").should(
      "have.value",
      6
    );
    cy.get("sd-downgrade-action:first-child").should("have.class", "disabled");
    cy.get("sd-downgrade-action:first-child a .glyphicon-trash").click();
    cy.get("sd-downgrade-action-form").should("exist");
    cy.get("sd-downgrade-action-form a").contains("Abbrechen").click();
    cy.get("sd-downgrade-action-form").should("not.exist");
    cy.get("sd-archive-format-form sd-downgrade-action:first-child").should(
      "not.have.class",
      "disabled"
    );

    // delete Reduktionsschritt
    cy.intercept(
      "DELETE",
      "/api/admin/profiles/42/archive_formats/43/downgrade_actions/44",
      {
        statusCode: 204,
      }
    );

    cy.on("window:confirm", (message) => {
      expect(message).to.match(/Willst du .* wirklich löschen\?/);
      return true;
    });
    cy.get("sd-downgrade-action:first-child a .glyphicon-trash").click();
    cy.get("sd-downgrade-action").should("have.length", 1);

    // delete profile
    cy.intercept("DELETE", "/api/admin/profiles/42", {
      statusCode: 204,
    });
    cy.get("sd-profile-form > form .btn-danger").contains("Löschen").click();
    cy.get(".alert-info").should("contain", "Das Profil Test wurde gelöscht");
    cy.get("sd-profiles-init").should("exist");

    cy.get("aside .list-group .list-group-item").should("have.length", 3);
  });
});
