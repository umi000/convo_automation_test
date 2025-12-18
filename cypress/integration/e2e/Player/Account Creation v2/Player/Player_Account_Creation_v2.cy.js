/// <reference types="cypress" />
import "cypress-mailosaur";
describe("GOS Account Creation", { testIsolation: false }, () => {
  before(() => {
    cy.visit("");
    cy.wait(2500);
    cy.get("body").then(($body) => {
      if ($body.find(".mb-4 > .nav-item").length > 0) {
        cy.get(".mb-4 > .nav-item").click({ force: true });
      } else {
        return;
      }
    });
  });
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.wait(4000);
  });
  // after(() => {
  //   cy.get(".mb-4 > .nav-item").click();
  // });
  const randomNumber = Math.floor(100000 + crypto.randomInt(50) * 900000);
  let emailAddress ;
  let password ;
  let userNameGenerator = "player" + randomNumber;
  let userName = userNameGenerator
  let updatedUserName = userName + "(Upd)"
  let playerName = "Automation Test Name" + randomNumber;
  const serverId = "vd5hecny";
  const serverDomain = "vd5hecny.mailosaur.net";
  const tempEmail =
    "stableStakesAutomation" + "+" + randomNumber + "@" + serverDomain;
  let emailVerificationLink = "";

  describe(
    "User Story 1: As a player, I want to create a unique username during signup so that I can be identified on the platform.",
    { testIslation: true },
    () => {
      it("Sign up into account", () => {
        cy.get("span.flex > .blue-btn > .btnn").click({ force: true });
        cy.wait(1500);
        cy.get("#email").type(tempEmail);
        cy.get("#password").type(password);
        cy.get(".mt-1").click();
        cy.get(".h-full > :nth-child(2) > .blue-btn").click();
        cy.wait(2000);
        cy.contains("Verify your account");
        cy.get("div.w-full > .p-3").should("not.exist");
      });

      it("Email verification", () => {
        cy.mailosaurGetMessage(serverId, {
          sentTo: tempEmail,
        }).then((email) => {
          cy.log(tempEmail, email.subject);
          emailVerificationLink = email.html.links[0].href;
          // cy.get("email.html.links[0].href").click();
          cy.log(emailVerificationLink);
          cy.wait(2000);
          cy.mai;
          cy.mailosaurDeleteAllMessages(serverId);
          cy.visit(emailVerificationLink);
        });
        cy.visit("");
      });

      it("Validate username max limit in complete signup form", () => {
        cy.get("span.flex > .p-3").click();
        cy.get("#username")
          .clear()
          .type("player123456789012345678901212345678901" + randomNumber);
        cy.contains("Username must be 20 characters or less");
      });

      it("Validate that it doesnot allow duplicate username", () => {
        cy.get("#username").clear().type("nova");
        cy.wait(1500);
        cy.contains("Username already taken");
      });

      it("Validate the saved username", () => {
        cy.get("#username").clear().type(userName);
        cy.wait(1500);
        cy.get("#name").clear().type(playerName);
        cy.get(".dropdown > .cursor-pointer > .flex").click();
        cy.get(".sticky > .relative > .w-full").clear().type("China");
        cy.get('[alt="China flag"]').click();
        cy.get(".chakra-button > .flex").click();
        cy.get(".input").clear().type("01/09/2001");
        cy.get(".h-full > :nth-child(2) > .p-3").click();
        cy.get(".chakra-modal__content-container").click();
        cy.wait(4000);
        cy.get(".pr-4 > :nth-child(3)").click({ force: true });
        cy.wait(2000);
        cy.get("#username").should("have.value", userName);
      });
    }
  );

  describe(
    "User Story 2: As a player, I want the ability to edit my username from the Edit Profile Section so that I can update my username.",
    { testIslation: true },
    () => {
      // it("Navigate to Login page and login into the account", () => {
      //   cy.get("span.flex > .navbar-btn").click({ force: true });
      //   cy.wait(1500);
      //   cy.get("#email").type(emailAddress);
      //   cy.get("#password").type(password);
      //   cy.get(".h-full > :nth-child(2) > .blue-btn").click();
      //   cy.wait(3500);
      // });

      it("Validate the username is correct", () => {
        // cy.get(".pr-4 > :nth-child(3)").click();
        // cy.wait(2000);
        cy.get("#username").should("have.value", userName);
      });

      it("Validate that it doesnot allow duplicate username", () => {
        cy.get("#username").clear().type("nova");
        cy.wait(1500);
        cy.contains("Username already taken");
      });

      it("Validate the valid condition for username", () => {
        cy.get("#username", { timeout: 40000 })
          .clear()
          .type("123456789012345678901212345678901", { timeout: 40000 });
        cy.wait(550);
        cy.contains("Username must be 20 characters or less", {
          timeout: 4000,
        });
      });

      it("Validate that the save button is inactive when the username is not valid", () => {
        cy.get(".normal-btn").should("be.disabled");
        cy.wait(2500);
        cy.get(".chakra-modal__content-container").click({ force: true });
      });

      it("Validate that it allows the user to update the username", () => {
        cy.get("#username").clear().type(updatedUserName);
        cy.wait(1500);
        cy.get(".normal-btn").should("be.enabled").click();
      });
    }
  );

  describe("User Story 5: As a player, I want the ability to manually enter date along with date picker in the date of birth field in the Complete Profile Section.", () => {
    it("Verify that the datepicker allows the user to select the date", () => {
      cy.get(".mr-2").should("be.visible").click();
      cy.get('select[name="years"]').select('1997');
      cy.get('[role="gridcell"]').eq(14).click();
    })

    it("Verify that the user can manually enter the DOB", () => {
      cy.get(".input").eq(2).clear().type("09/22/2007");
      cy.get(".normal-btn").should("be.enabled").click();
    });
  })

  describe("User Story 4: As a player, I want to read the privacy policy and T&Cs before signing up", () => {
    it("Validate the Signup button to be disable if the checkbox is unchecked", () => {
      cy.get(".mb-4 > .nav-item").click({ force: true });
      cy.wait(2000);
      cy.get("span.flex > .blue-btn").click({ force: true });
      cy.get(".mt-1").should("exist").should("be.visible");
      cy.get(".h-full > :nth-child(2) > .blue-btn").should("be.disabled");
    });

    it("Validate the Signup button to be enable if the checkbox is checked", () => {
      cy.get("#email").type(emailAddress + "+" + randomNumber);
      cy.get("#password").type(password);
      cy.get(".mt-1").should("exist").should("be.visible").click();
      cy.get(".h-full > :nth-child(2) > .blue-btn").should("not.be.disabled");
    });

    it("Verify The terms and condition text is clickable", () => {
      cy.get('[href="https://stablestakesiq.com/termsofuse/"]')
        .invoke("attr", "target", "_self")
        .click();
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.log("The terms and conditions text is clickable");
      cy.wait(2000);
    });

    it("Validate that the terms and conditions page is opened", () => {
      cy.url().should("include", "/termsofuse");
      cy.get(
        ".e-con-inner > .elementor-element > .elementor-widget-container > .elementor-heading-title"
      ).should("contain", "Terms of Use");
    });

    it("Verify The Privacy Policy text is clickable", () => {
      cy.go("back");
      cy.get("span.flex > .blue-btn").click({ force: true });
      cy.get('[href="https://stablestakesiq.com/privacypolicy/"]')
        .invoke("attr", "target", "_self")
        .click();
      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.log("The privacy policy text is clickable");
      cy.wait(2000);
    });

    it("Validate that the Privacy Policy page is opened", () => {
      cy.url().should("include", "/privacypolicy");
      cy.get(
        ".e-con-inner > .elementor-element > .elementor-widget-container > .elementor-heading-title"
      ).should("contain", "Privacy Policy");
    });
  });


});

