// cypress/pages/FacturacionPage.js
// Migración completa de FacturacionPage.java → Cypress Page Object Model
// Patrón Page Factory: selectores centralizados en un solo objeto

import BasePage from "./BasePage";

// ─── PAGE FACTORY — todos los selectores en un lugar ─────────────────────────
const SELECTORS = {
  // Botones principales (por texto dentro del <p>)
  btnSolicitarFactura: "button p",
  btnAgregar:          "button p",

  // Campos del formulario — mismos IDs que en Selenium
  rfc:       "#rfc",
  nomraz:    "#nomraz",
  cp:        "#cp",
  correo:    "#correo",
  correo2:   "#correo2",
  tienda:    "#tienda",
  numTicket: "#numTicket",
  importe:   "#importe",

  // MUI Selects — mismos IDs que en Selenium
  cfdi:   "#cfdi",
  regfis: "#regfis",
  caja:   "#caja",

  // Date picker
  btnCalendario: "button[aria-label='Choose date']",
  diasGrid:      "button[role='gridcell']",

  // Dropdown options
  opcionMui: "li[role='option']",
};

// ─────────────────────────────────────────────────────────────────────────────
class FacturacionPage extends BasePage {

  // ── NAVEGACIÓN ──────────────────────────────────────────────────────────────

  /**
   * Equivalente a navegarAlPortal()
   */
  navegarAlPortal() {
    this.visit("/");
    cy.contains(SELECTORS.btnSolicitarFactura, "Solicitar factura", {
      timeout: 20000,
    }).should("be.visible");
    cy.log("Portal cargado");
  }

  // ── ACCIONES ────────────────────────────────────────────────────────────────

  /**
   * Equivalente a clickSolicitarFactura()
   */
  clickSolicitarFactura() {
    cy.contains(SELECTORS.btnSolicitarFactura, "Solicitar factura", {
      timeout: 20000,
    })
      .parents("button")
      .first()
      .should("be.visible")
      .click();
    cy.log("Click: Solicitar Factura");
  }

  /**
   * Equivalente a llenarRFC()
   */
  llenarRFC(valor) {
    cy.fillInput(SELECTORS.rfc, valor, "RFC");
  }

  /**
   * Equivalente a llenarRazonSocial()
   */
  llenarRazonSocial(valor) {
    cy.fillInput(SELECTORS.nomraz, valor, "Razón Social");
  }

  /**
   * Equivalente a seleccionarUsoCFDI()
   */
  seleccionarUsoCFDI(valor) {
    cy.muiSelect("cfdi", valor);
  }

  /**
   * Equivalente a seleccionarRegimenFiscal()
   */
  seleccionarRegimenFiscal(valor) {
    cy.muiSelect("regfis", valor);
  }

  /**
   * Equivalente a llenarCodigoPostal()
   */
  llenarCodigoPostal(valor) {
    cy.fillInput(SELECTORS.cp, valor, "Código Postal");
  }

  /**
   * Equivalente a llenarCorreo()
   */
  llenarCorreo(valor) {
    cy.fillInput(SELECTORS.correo, valor, "Correo");
  }

  /**
   * Equivalente a llenarCorreo2()
   */
  llenarCorreo2(valor) {
    cy.fillInput(SELECTORS.correo2, valor, "Correo 2");
  }

  /**
   * Equivalente a llenarSucursal()
   */
  llenarSucursal(valor) {
    cy.fillInput(SELECTORS.tienda, valor, "Sucursal");
  }

  /**
   * Equivalente a llenarNumTicket()
   */
  llenarNumTicket(valor) {
    cy.fillInput(SELECTORS.numTicket, valor, "Ticket");
  }

  /**
   * Equivalente a seleccionarCaja()
   */
  seleccionarCaja(valor) {
    cy.muiSelect("caja", valor);
  }

  /**
   * Equivalente a llenarImporte()
   */
  llenarImporte(valor) {
    cy.fillInput(SELECTORS.importe, valor, "Importe");
  }

  /**
   * Equivalente a seleccionarFecha()
   * Formato: YYYY/MM/DD
   */
  seleccionarFecha(valor) {
    cy.pickDate(valor);
  }

  /**
   * Equivalente a clickAgregarTicket()
   * Incluye workaround para Intercom iframe
   */
  clickAgregarTicket() {
    cy.hideIntercom();
    cy.contains(SELECTORS.btnAgregar, "Agregar", { timeout: 20000 })
      .parents("button")
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.log("Click: Agregar");
  }

  // ── VALIDACIONES ────────────────────────────────────────────────────────────

  /**
   * Equivalente a formularioCompletado()
   * Verifica que todos los campos tengan valor
   */
  formularioCompletado() {
    const campos = [
      { sel: SELECTORS.rfc,       nombre: "RFC"          },
      { sel: SELECTORS.nomraz,    nombre: "Razón Social"  },
      { sel: SELECTORS.cp,        nombre: "Código Postal" },
      { sel: SELECTORS.correo,    nombre: "Correo"        },
      { sel: SELECTORS.tienda,    nombre: "Sucursal"      },
      { sel: SELECTORS.numTicket, nombre: "Ticket"        },
      { sel: SELECTORS.importe,   nombre: "Importe"       },
    ];

    campos.forEach(({ sel, nombre }) => {
      this.assertFieldNotEmpty(sel, nombre);
    });
  }
}

export default FacturacionPage;
