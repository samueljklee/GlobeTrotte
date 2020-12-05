const email = "whatisthisemail@test.com";
const password = "hunter2";

function login(cy) {
  cy.get("#username").type(email);
  cy.get("#password").type(password);
  cy.get("#save").click();
}

function isLoggedOut(cy) {
  cy.get(".main_menu").should("not.contain", "Logout");
  cy.get(".main_menu").should("not.contain", "My Account");
  cy.contains("li", "Register");
  cy.contains("li", "Login");
}

function isLoggedIn(cy) {
  cy.get(".main_menu").should("not.contain", "Register");
  cy.get(".main_menu").should("not.contain", "Login");
  cy.contains("li", "Logout");
  cy.contains("li", "My Account");
}

describe("User account", () => {
  it("register", () => {
    cy.visit("/");
    isLoggedOut(cy);
    cy.contains("li", "Register").click();
    cy.url().should("include", "/register");
    cy.get("#username").type(email);
    cy.get("#password").type(password);
    cy.get("#confPassword").type(password);
    cy.get("#save").click();
    cy.url().should("include", "/login");
  });

  it("login", () => {
    cy.visit("/");
    isLoggedOut(cy);
    cy.contains("li", "Login").click();
    login(cy);
    isLoggedIn(cy);
  });

  it("logout", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    login(cy);
    isLoggedIn(cy);
    cy.contains("li", "Logout").click();
    isLoggedOut(cy);
    cy.contains("h1", "GlobeTrotte");
  });

  it("delete", () => {
    cy.visit("/login");
    isLoggedOut(cy);
    login(cy);
    isLoggedIn(cy);
    cy.contains("li", "My Account").click();
    cy.contains("button", "Delete Account").click();
    isLoggedOut(cy);
  });
});