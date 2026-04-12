// cypress/stepdefinitions/FacturacionSteps.js
// En @badeball/cypress-cucumber-preprocessor v20+ "And" no existe como export.
// Los pasos "And" del .feature se mapean con When (pasos de acción) o Then (pasos de validación).

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import FacturacionPage from "../pages/FacturacionPage";

// Instancia compartida entre steps del mismo escenario
let page;

// ─── GIVEN ───────────────────────────────────────────────────────────────────

Given("el usuario navega al portal de facturación de Tiendas 3B", () => {
  page = new FacturacionPage();
  page.navegarAlPortal();
});

// ─── WHEN ─────────────────────────────────────────────────────────────────────

When("el usuario hace click en {string}", (boton) => {
  if (boton.toLowerCase() === "solicitar factura") {
    page.clickSolicitarFactura();
  }
});

When("el usuario captura el RFC {string}", (valor) => {
  page.llenarRFC(valor);
});

When("el usuario captura el nombre {string}", (valor) => {
  page.llenarRazonSocial(valor);
});

When("el usuario selecciona uso CFDI {string}", (valor) => {
  page.seleccionarUsoCFDI(valor);
});

When("el usuario selecciona regimen fiscal {string}", (valor) => {
  page.seleccionarRegimenFiscal(valor);
});

When("el usuario captura el codigo postal {string}", (valor) => {
  page.llenarCodigoPostal(valor);
});

When("el usuario captura el correo {string}", (valor) => {
  page.llenarCorreo(valor);
});

When("el usuario captura el correo2 {string}", (valor) => {
  page.llenarCorreo2(valor);
});

When("el usuario captura la sucursal {string}", (valor) => {
  page.llenarSucursal(valor);
});

When("el usuario captura el ticket {string}", (valor) => {
  page.llenarNumTicket(valor);
});

When("el usuario selecciona la caja {string}", (valor) => {
  page.seleccionarCaja(valor);
});

When("el usuario captura el importe {string}", (valor) => {
  page.llenarImporte(valor);
});

When("el usuario selecciona la fecha {string}", (valor) => {
  page.seleccionarFecha(valor);
});

When("el usuario agrega el ticket", () => {
  page.clickAgregarTicket();
});

// ─── THEN ─────────────────────────────────────────────────────────────────────

Then("el formulario de solicitud fue completado correctamente", () => {
  page.formularioCompletado();
});
