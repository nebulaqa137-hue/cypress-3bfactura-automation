# cypress/runners/facturacion.feature
# Los pasos "And" en Gherkin son válidos en el .feature — el preprocessor los mapea
# automáticamente al step definition When/Then que coincida con el texto.

@facturacion @regresion
Feature: Solicitud de Factura en Portal Tiendas 3B
  Como cliente de Tiendas 3B
  Quiero solicitar mi factura electrónica
  Para obtener comprobante fiscal de mi compra

  Background:
    Given el usuario navega al portal de facturación de Tiendas 3B
    When el usuario hace click en "Solicitar factura"

  @smoke @persona_fisica
  Scenario: Solicitud de factura para persona física
    When el usuario captura el RFC "XAXX010101000"
    When el usuario captura el nombre "JUAN PEREZ GARCIA"
    When el usuario selecciona uso CFDI "Gastos en general"
    When el usuario selecciona regimen fiscal "Personas Físicas con Actividades Empresariales"
    When el usuario captura el codigo postal "06600"
    When el usuario captura el correo "juan.perez@email.com"
    When el usuario captura el correo2 "juan.perez@email.com"
    When el usuario captura la sucursal "0001"
    When el usuario captura el ticket "123456"
    When el usuario selecciona la caja "1"
    When el usuario captura el importe "350.00"
    When el usuario selecciona la fecha "2024/06/15"
    When el usuario agrega el ticket
    Then el formulario de solicitud fue completado correctamente

  @smoke @persona_moral
  Scenario: Solicitud de factura para persona moral
    When el usuario captura el RFC "AAA010101AAA"
    When el usuario captura el nombre "EMPRESA DEMO SA DE CV"
    When el usuario selecciona uso CFDI "Adquisición de mercancias"
    When el usuario selecciona regimen fiscal "General de Ley Personas Morales"
    When el usuario captura el codigo postal "11000"
    When el usuario captura el correo "facturacion@empresa.com"
    When el usuario captura el correo2 "facturacion@empresa.com"
    When el usuario captura la sucursal "0025"
    When el usuario captura el ticket "789012"
    When el usuario selecciona la caja "3"
    When el usuario captura el importe "1200.50"
    When el usuario selecciona la fecha "2024/06/12"
    When el usuario agrega el ticket
    Then el formulario de solicitud fue completado correctamente

  @datos_externos
  Scenario Outline: Solicitud de factura con múltiples datos
    When el usuario captura el RFC "<rfc>"
    When el usuario captura el nombre "<nombre>"
    When el usuario selecciona uso CFDI "<cfdi>"
    When el usuario selecciona regimen fiscal "<regimen>"
    When el usuario captura el codigo postal "<cp>"
    When el usuario captura el correo "<correo>"
    When el usuario captura el correo2 "<correo>"
    When el usuario captura la sucursal "<sucursal>"
    When el usuario captura el ticket "<ticket>"
    When el usuario selecciona la caja "<caja>"
    When el usuario captura el importe "<importe>"
    When el usuario selecciona la fecha "<fecha>"
    When el usuario agrega el ticket
    Then el formulario de solicitud fue completado correctamente

    Examples:
      | rfc           | nombre             | cfdi              | regimen                                             | cp    | correo      | sucursal | ticket | caja | importe | fecha      |
      | XAXX010101000 | CLIENTE PRUEBA UNO | Gastos en general | Sueldos y Salarios e Ingresos Asimilados a Salarios | 06600 | c1@test.com | 0001     | 111111 | 1    | 150.00  | 2024/06/10 |
      | XEXX010101000 | CLIENTE PRUEBA DOS | Gastos en general | Sin obligaciones fiscales                           | 44100 | c2@test.com | 0015     | 222222 | 2    | 500.00  | 2024/06/12 |
