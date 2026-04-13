
import "allure-cypress";
// ── Cucumber preprocessor: registra Given/When/Then en browser ────────────────
import "@badeball/cypress-cucumber-preprocessor";
// ─────────────────────────────────────────────────────────────────────────────
// HOOKS GLOBALES  (equivalente a @Before / @After en Java)
// ─────────────────────────────────────────────────────────────────────────────
before(() => {
  cy.log("Suite iniciada — Portal Facturación 3B");
});
beforeEach(() => {
  cy.log("Escenario iniciado");
});
afterEach(function () {
  if (this.currentTest && this.currentTest.state === "failed") {
    const titulo = this.currentTest.title.replace(/[^a-zA-Z0-9]/g, "_");
    cy.screenshot(`FALLO_${titulo}`, { capture: "fullPage" });
  }
  cy.log("Escenario finalizado");
});

after(() => {
  cy.log("Suite completada");
});

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM COMMANDS  (equivalente a utils/helpers de Java)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Llenar un campo de texto: limpia y escribe
 * Equivalente a escribir() en Java
 */
Cypress.Commands.add("fillInput", (selector, value, label = "") => {
  cy.get(selector, { timeout: 20000 })
    .should("be.visible")
    .clear()
    .type(value, { delay: 50 });
  if (label) cy.log(`${label}: "${value}"`);
});
/**
 * Seleccionar opción en MUI Select (Material UI dropdown)
 * Equivalente a seleccionarMuiSelect() en Java
 */
Cypress.Commands.add("muiSelect", (selectId, optionText) => {
  cy.log(`MUI Select [${selectId}] → "${optionText}"`);
  cy.get(`#${selectId}`, { timeout: 20000 })
    .should("be.visible")
    .scrollIntoView()
    .click();
  cy.get("li[role='option']", { timeout: 10000 })
    .contains(new RegExp(optionText.trim(), "i"))
    .should("be.visible")
    .click();
});
/**
 * Ocultar iframes de Intercom para evitar bloqueos de click
 * Equivalente al workaround en clickAgregarTicket() en Java
 */
Cypress.Commands.add("hideIntercom", () => {
  cy.window().then((win) => {
    win.document
      .querySelectorAll('iframe[name*="intercom"]')
      .forEach((f) => { f.style.display = "none"; });
  });
  cy.log("Intercom ocultado");
});
/**
 * Seleccionar día en el date-picker de MUI
 * Equivalente a seleccionarFecha() en Java — Formato: YYYY/MM/DD
 */
Cypress.Commands.add("pickDate", (dateString) => {
  const parts = dateString.split("/");
  const day = String(parseInt(parts[2], 10));
  cy.log(`Abriendo calendario — buscando día: ${day}`);
  cy.get("button[aria-label='Choose date']", { timeout: 20000 })
    .scrollIntoView()
    .click({ force: true });
  cy.get("button[role='gridcell']", { timeout: 10000 })
    .filter((_, el) => el.textContent.trim() === day)
    .first()
    .click({ force: true });
  cy.log(`Día seleccionado: ${day}`);
});
//Prueba DevOps