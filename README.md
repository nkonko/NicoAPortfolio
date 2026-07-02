# NicoAPortfolio — Personal Portfolio

[![Angular](https://img.shields.io/badge/Angular-22-red?logo=angular&logoColor=white)](https://angular.dev)
[![NGRX](https://img.shields.io/badge/state%20management-NGRX-9C27B0?logo=ngrx&logoColor=white)](https://ngrx.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Bulma](https://img.shields.io/badge/CSS-Bulma-00D1B2?logo=bulma&logoColor=white)](https://bulma.io)
[![Firebase Hosting](https://img.shields.io/badge/hosting-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079)](https://github.com/semantic-release/semantic-release)
[![Build](https://github.com/nkonko/NicoAPortfolio/actions/workflows/firebase-deploy.yml/badge.svg)](https://github.com/nkonko/NicoAPortfolio/actions/workflows/firebase-deploy.yml)
[![Release](https://img.shields.io/github/v/release/nkonko/NicoAPortfolio)](https://github.com/nkonko/NicoAPortfolio/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

> **Live:** [nicoazzara.web.app](https://nicoazzara.web.app)

Mi portfolio personal — una SPA hecha con **Angular** que muestra mi perfil profesional, experiencia, skills, proyectos y un formulario de contacto. Arrancó como un proyecto con Angular 15, pasó por Angular 17, y actualmente está actualizado a **Angular 22**.

---

## ✨ Features

- 📄 **Perfil profesional** — presentación, experiencia laboral y educacion
- 🛠 **Skills** — organizados por categorías con tabs (Frontend, Backend, Tools, etc.)
- 📂 **Repos / Proyectos** — cards con proyectos destacados
- 📬 **Contacto** — formulario funcional via EmailJS
- 🌙 **Tema claro/oscuro** — con design tokens, toggle en navbar y persistencia en localStorage
- 📱 **Responsive** — Bulma + estilos custom adaptados a todos los dispositivos

---

## 🏗 Arquitectura

```
src/
├── app/
│   ├── core/           → Singleton services, store global (NGRX), modelos
│   │   └── store/      → Actions, Reducers, Selectors, Effects
│   ├── shared/         → Componentes reutilizables (layout, skill-boxes)
│   └── modules/        → Feature modules lazy-loaded
│       ├── home/
│       ├── about/
│       ├── skills/     → State propio con NGRX (feature selectors)
│       ├── experience/
│       ├── repos/
│       └── contact/    → State propio con NGRX
├── assets/
├── environments/
└── styles/             → Design tokens y variables custom
```

### Stack técnico

| Capa           | Tecnología                                         |
| -------------- | -------------------------------------------------- |
| **Framework**  | Angular 22                                        |
| **Lenguaje**   | TypeScript 6.0                                    |
| **Estado**     | NGRX Store + Effects (StoreModule, EffectsModule)  |
| **CSS**        | Bulma + SCSS + Design Tokens                      |
| **Contacto**   | EmailJS                                           |
| **Testing**    | Vitest + Jasmine (via `@angular/build:unit-test`)  |
| **CI/CD**      | GitHub Actions → semantic-release → Firebase Hosting |
| **Hosting**    | Firebase Hosting (site: `nicoazzara`)              |

**NGRX** maneja el estado global de la app (datos del perfil, skills, proyectos, experiencia, redes sociales) y también estados locales por feature (contact form, skills tabs). El `BootstrapService` dispara la acción `AppInit` al arranque para cargar datos iniciales via el store.

---

## 🚀 Dev

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Servidor de desarrollo
ng serve

# Build
ng build --configuration production

# Tests
ng test --watch=false
```

---

## 🔄 CI/CD

El pipeline en `.github/workflows/firebase-deploy.yml` se ejecuta automáticamente al hacer push a `master`:

1. **Setup** Node 22 + dependencias
2. **Test** — `ng test --watch=false`
3. **Build** — producción
4. **Semantic Release** — versionado automático, genera CHANGELOG y GitHub Release
5. **Deploy** — a Firebase Hosting (idempotente)

El versionado sigue [Conventional Commits](https://www.conventionalcommits.org/) via semantic-release.

---

## 🧪 Testing

El proyecto usa **Vitest** via `@angular/build:unit-test` con API compatible Jasmine. Los componentes con NGRX usan `provideMockStore` para mockear el store en las pruebas.

```bash
ng test              # una vuelta
ng test --watch=true # modo watch (desarrollo)
```

---

## 📦 Releases

Los releases se generan automáticamente via [semantic-release](https://semantic-release.gitbook.io/) al hacer push a `master`. Cada release produce:

- Version bump en `package.json`
- `CHANGELOG.md` actualizado
- GitHub Release con release notes
- Deploy automático a Firebase

## 📄 Licencia

MIT
