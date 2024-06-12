describe("playback formats", () => {
  beforeEach(() => {
    window.localStorage.setItem("admin_token", "42");

    cy.intercept("GET", "/api/login", {
      fixture: "login/user.json",
      statusCode: 200,
    });
    cy.intercept(
      "GET",
      "/api/admin/playback_formats?sort=codec&page%5Bsize%5D=500",
      {
        fixture: "playback_formats/playback_formats.json",
        statusCode: 200,
      },
    );
    cy.intercept("GET", "/api/admin/audio_encodings", {
      fixture: "audio_encodings/audio_encodings.json",
      statusCode: 200,
    });
  });

  it("opens playback formats", function () {
    cy.visit("/playback_formats", { failOnStatusCode: false });

    cy.get("sd-playback-formats-init h1").should(
      "have.text",
      "Wiedergabeformate",
    );
    cy.get("aside .list-group .list-group-item").should("have.length", 2);

    cy.intercept("GET", "/api/admin/playback_formats/822469720", {
      fixture: "playback_formats/mp3_high.json",
      statusCode: 200,
    });

    cy.get(".list-group-item").contains("MP3 high").click();
    cy.get(".list-group-item")
      .contains("MP3 high")
      .should("have.class", "active");
    cy.get(".content h1").should("have.text", "MP3 high");
    cy.get("#description").should(
      "have.value",
      "High fidelity audio entertainment",
    );
    cy.get("#name").should("have.value", "high");
    cy.get("#codec").should("have.value", "mp3");
    cy.get("#bitrate").should("have.value", "192");
  });

  it("adds and deletes new playback_format", function () {
    cy.visit("/playback_formats", { failOnStatusCode: false });

    cy.get("a.btn-add").click();
    cy.get(".content h1").should("have.text", "Neues Wiedergabeformat");
    cy.get("#name").type("mid");
    cy.get("#description").type("Mittelmass");
    cy.get("#bitrate").should("not.exist");
    cy.get("#codec").select("flac");
    cy.get("#bitrate").should("not.exist");
    cy.get("#codec").select("mp3");
    cy.get("#bitrate").should("exist");
    cy.get("#bitrate").select("160");

    cy.intercept("POST", "/api/admin/playback_formats", {
      fixture: "playback_formats/new.json",
      statusCode: 200,
    });
    cy.intercept("GET", "/api/admin/playback_formats/42", {
      fixture: "playback_formats/new.json",
      statusCode: 200,
    });

    cy.get(".btn-primary").click();

    cy.get("#notification .alert-info").should(
      "contain",
      "Der Eintrag wurde erfolgreich gespeichert",
    );
    cy.get("#notification .alert-info .close").click();
    cy.get("#notification").should("have.class", "remove");
    cy.get("aside .list-group .list-group-item").should("have.length", 3);

    cy.get(".list-group-item")
      .contains("MP3 mid")
      .should("have.class", "active");
    cy.get("sd-playback-format-form h1").should("have.text", "MP3 mid");

    cy.on("window:confirm", (message) => {
      expect(message).to.match(/Willst du .* wirklich löschen\?/);
      return true;
    });
    cy.intercept("DELETE", "/api/admin/playback_formats/42", {
      statusCode: 204,
    });
    cy.get("sd-playback-format-form > form .btn-danger")
      .contains("Löschen")
      .click();
    cy.get(".alert-info").should(
      "contain",
      "Das Wiedergabeformat MP3 mid wurde gelöscht",
    );
    cy.get("sd-playback-formats-init").should("exist");

    cy.get("aside .list-group .list-group-item").should("have.length", 2);
  });
});
