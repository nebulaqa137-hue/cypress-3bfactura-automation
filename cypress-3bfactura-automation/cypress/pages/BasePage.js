// cypress/pages/BasePage.js
// Clase base equivalente a BasePage.java en Selenium
// Todos los Page Objects heredan de esta clase

class BasePage {
  /**
   * Navega a una ruta relativa al baseUrl configurado
   */
  visit(path = "/") {
    cy.visit(path);
    cy.log(`Navegando a: ${path}`);
  }

  /**
   * Obtiene un elemento visible
   */
  getElement(selector, timeout = 20000) {
    return cy.get(selector, { timeout }).should("be.visible");
  }

  /**
   * Llena un campo de texto
   */
  fillField(selector, value, label = "") {
    cy.fillInput(selector, value, label);
  }

  /**
   * Click con scroll automático
   */
  clickElement(selector, label = "") {
    cy.get(selector, { timeout: 20000 })
      .scrollIntoView()
      .should("be.visible")
      .click();
    if (label) cy.log(`Click: ${label}`);
  }

  /**
   * Click forzado — equivalente a jsClick() en Java
   */
  forceClick(selector, label = "") {
    cy.get(selector, { timeout: 20000 })
      .scrollIntoView()
      .click({ force: true });
    if (label) cy.log(`Force click: ${label}`);
  }

  /**
   * Selección en MUI Select
   */
  selectMui(selectId, optionText) {
    cy.muiSelect(selectId, optionText);
  }

  /**
   * Verifica que el valor de un input no esté vacío
   */
  assertFieldNotEmpty(selector, fieldName = "") {
    cy.get(selector, { timeout: 10000 })
      .invoke("val")
      .then((val) => {
        cy.log(`${fieldName}: "${val}"`);
        expect(val, `El campo "${fieldName}" no debe estar vacío`).to.not.be.empty;
      });
  }
}

export default BasePage;
//Agregar comentario 
