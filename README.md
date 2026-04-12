# Cypress — Portal Facturación 3B

Migración de Selenium (Java/Cucumber/Allure) → **Cypress 13 + Cucumber + Allure**

---

## Estructura de carpetas

```
cypress-3bfactura/
├── cypress/
│   ├── hooks/
│   │   └── index.js              ← @Before/@After + Custom Commands
│   ├── pages/
│   │   ├── BasePage.js           ← Clase base con utilidades
│   │   └── FacturacionPage.js    ← Page Object con selectores y acciones
│   ├── runners/
│   │   └── facturacion.feature   ← Escenarios Gherkin (BDD)
│   ├── stepdefinitions/
│   │   └── FacturacionSteps.js   ← Mapeo de steps a acciones
│   └── fixtures/
│       └── facturacion.json      ← Datos de prueba
├── allure-results/               ← Resultados generados al correr
├── cypress.config.js             ← Configuración principal
└── package.json
```

---

## Instalación

```bash
# Node 18+ requerido
node -v

# Instalar dependencias (ya vienen en node_modules si descargaste el ZIP completo)
npm install
```

---

## Comandos

```bash
# Abrir Cypress en modo interactivo (recomendado para empezar)
npm run cy:open

# Correr headless
npm run cy:run

# Correr + generar reporte Allure
npm run cy:run:allure

# Ver reporte Allure en el navegador
npm run allure:serve
```

### Filtrar por tags

```bash
# Solo escenarios @smoke
npx cypress run --env tags="@smoke"

# Solo persona física
npx cypress run --env tags="@persona_fisica"

# Toda la regresión
npx cypress run --env tags="@regresion"
```

---

## Equivalencias Java → Cypress

| Java (Selenium)              | Cypress                                      |
|------------------------------|----------------------------------------------|
| `BasePage.java`              | `pages/BasePage.js`                          |
| `FacturacionPage.java`       | `pages/FacturacionPage.js`                   |
| `FacturacionSteps.java`      | `stepdefinitions/FacturacionSteps.js`        |
| `hooks/` (CucumberHooks)     | `hooks/index.js`                             |
| `runners/` (CucumberRunner)  | `runners/facturacion.feature`                |
| `WebDriverWait`              | `cy.get(..., { timeout: 20000 })`            |
| `jsClick()`                  | `.click({ force: true })`                    |
| `seleccionarMuiSelect()`     | `cy.muiSelect()` (custom command)            |
| `Thread.sleep()`             | Eliminado — Cypress usa reintentos internos  |
| `Assert.assertTrue()`        | `expect(...).to.not.be.empty`                |

---

## Versiones utilizadas

| Paquete                                  | Versión  |
|------------------------------------------|----------|
| cypress                                  | 13.6.0   |
| @badeball/cypress-cucumber-preprocessor  | 20.0.3   |
| @bahmutov/cypress-esbuild-preprocessor   | 2.2.2    |
| allure-cypress                           | 2.15.1   |
| allure-js-commons                        | 2.15.1   |
| esbuild                                  | 0.19.12  |
