# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

`deposito_vitoria` is a full-stack web application for the Brazilian construction materials store Depósito Vitória. The project is split into:
- `api/`: Node.js + TypeScript Fastify API backed by PostgreSQL via Prisma.
- `frontend/`: React + Vite single-page application styled with Tailwind CSS and design primitives under `components/`.

## Commands

### Backend API (`api/`)

From the repo root, backend work is done in `api/`:

- Install dependencies:
  - `cd api && npm install`
- Start dev server (Fastify on port 3000):
  - `cd api && npm run dev`
- Apply database migrations and generate Prisma client (expects `DATABASE_URL`):
  - `cd api && npm run db:deploy`
- Lint TypeScript sources:
  - `cd api && npm run lint`
- Auto-fix lint issues:
  - `cd api && npm run lint:fix`
- Format code with Prettier:
  - `cd api && npm run format`

Tests are not yet configured in `api/` (`npm test` is a placeholder that exits with an error). When a test runner is added, document the single-test command here (for example, a pattern-based `npm test -- <pattern>`), and prefer running the smallest relevant test file when iterating.

### Frontend app (`frontend/`)

From the repo root, frontend work is done in `frontend/`:

- Install dependencies:
  - `cd frontend && npm install`
- Start Vite dev server (default on port 5173):
  - `cd frontend && npm run dev`
- Build production assets:
  - `cd frontend && npm run build`
- Preview production build locally:
  - `cd frontend && npm run preview`
- Lint frontend sources:
  - `cd frontend && npm run lint`
- Auto-fix lint issues:
  - `cd frontend && npm run lint:fix`
- Format frontend code with Prettier:
  - `cd frontend && npm run format`

### Containers and environment

Both subprojects have Dockerfiles for running in containers:
- `api/Dockerfile`: Node 20 image; installs dependencies, runs `npx prisma generate`, and starts the dev server with `npx prisma db push --accept-data-loss && npm run dev` on port 3000.
- `frontend/Dockerfile`: Node 20 image; installs dependencies and runs `npm run dev` on port 5173.

Key environment variables referenced in code:
- Backend (`api/`):
  - `DATABASE_URL`: PostgreSQL connection URL used by Prisma in `api/prisma/schema.prisma`.
  - `JWT_SECRET`: secret key for signing and verifying JWTs in auth code; a weak default is present in code and should be overridden in real environments.
- Frontend (`frontend/`):
  - `VITE_API_URL`: base URL for the Axios client (`frontend/src/services/index.js`); defaults to `http://localhost:3000/` if unset.

## Backend architecture (`api/`)

### Runtime and entrypoint

- The backend is a Fastify server written in TypeScript and compiled/run via `tsx`.
- Entrypoint is `api/src/server.ts`:
  - Creates a Fastify instance with logging.
  - Registers CORS.
  - Registers domain-specific route plugins with prefixes:
    - `UserRoute` with prefix `"users"`.
    - `ProductRoute` with prefix `"products"`.
    - `AddressRoute` with prefix `"addresses"`.
    - `CartRoute` with prefix `"carts"`.
    - `PaymentRoute` with prefix `"payments"`.
    - `OrderRoute` with prefix `"orders"`.
    - `OrderItemRoute` with prefix `"order-items"`.
    - `CartItemRoute` with prefix `"cart-items"`.
  - Listens on `0.0.0.0:3000`.

Route modules are Fastify plugins that receive an instance and register HTTP handlers. When adding or modifying routes, account for how Fastify combines the prefix passed from `server.ts` with the paths defined inside each `*Route.ts` file to avoid duplicated path segments.

### Routing, controllers, and services

The backend follows a route → controller → service → Prisma pattern:

- **Routes** (`api/src/routes/*.ts`):
  - Each `*Route.ts` exports a plugin that registers endpoints and wires middlewares.
  - Example: `ProductRoute` in `api/src/routes/ProductRoute.ts` registers product endpoints and attaches `authMiddleware` and `adminOnlyMiddleware` to mutating operations.

- **Controllers** (`api/src/controllers/*Controller.ts`):
  - Receive `FastifyRequest`/`FastifyReply` objects and handle:
    - Parsing and validating parameters and bodies using Zod schemas from the DTO layer.
    - Converting pagination query params into numeric `page`, `limit`, and computing `skip`.
    - Returning 4xx responses for validation errors with detailed Zod issues.
    - Calling service methods for core logic.
  - Example: `ProductController` uses `CreateProductSchema` / `UpdateProductSchema` and `SearchPaginationSchema` to validate inputs before delegating to `ProductService`.

- **DTO / validation layer** (`api/src/dtos/**`):
  - Each domain (user, product, address, cart, order, payment, orderItem, cartItem) has its own DTO folder with:
    - Zod schema(s) describing the expected request payloads (e.g., `CreateProductSchema`, `UpdateProductSchema`, `PaginationSchema`).
    - TypeScript DTO types (e.g., `CreateProductDTO`, `UpdateProductDTO`) inferred from these schemas.
  - Shared pagination schemas live under product DTOs and are reused in other controllers (like user listing).

- **Services** (`api/src/services/*.ts`):
  - Pure application logic and database access live here.
  - Services receive already-validated DTOs from controllers and operate on the Prisma client.
  - Pattern:
    - Read operations use `findMany`/`findUnique` with pagination support.
    - Write operations (`create`, `update`, `delete`) accept DTOs and map them to Prisma data.
    - Many list methods return `{ items, meta: { totalItems, limit, currentPage, totalPages } }`-style objects, where `items` is entity-specific (e.g., `products`, `users`).
  - Example: `ProductService` uses Prisma to create products, paginate `getAllProducts`, and perform ID-based CRUD.

- **Prisma integration**:
  - `api/src/prisma/index.ts` exports a singleton `PrismaClient` instance.
  - Data models and relations are defined in `api/prisma/schema.prisma` with enums for business states.
  - The schema models the core domain entities:
    - `User` with `Role` enum (`CUSTOMER`, `ADMIN`) and relations to `Order`, `Cart`, and `Address`.
    - `Product` with price, stock, brand, category, and relations to `CartItem` and `OrderItem`.
    - Shopping flow entities: `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment` (with `PaymentStatus`), and `Delivery` (with `DeliveryStatus`).
    - `Address` with `AddressType` enum for delivery vs billing addresses.

### Cross-cutting concerns and auth

- **Middlewares** (`api/src/common/middlewares`):
  - `authMiddleware`:
    - Extracts a `Bearer <token>` from the `Authorization` header.
    - Verifies it with `jsonwebtoken` and `JWT_SECRET`.
    - On success, attaches `request.user = { id, role }` to the Fastify request.
    - Returns `401` for missing or invalid tokens.
  - `adminOnlyMiddleware`:
    - Requires `request.user.role === "ADMIN"`.
    - Returns `403` for non-admin or unauthenticated requests.
  - When creating new protected endpoints, reuse these middlewares via `preHandler` arrays in route definitions.

- **User auth and password handling** (`api/src/services/UserService.ts`):
  - Uses `bcryptjs` for hashing passwords with a fixed salt rounds constant.
  - On login:
    - Looks up a user by email, including password hash.
    - Compares the provided password with the stored hash.
    - Issues a JWT with payload containing `userId` and expiry (`JWT_EXPIRES_IN` = `1d`).
    - Returns both token and user data (without password) to the client.
  - The same `JWT_SECRET` is used here for signing tokens and in `authMiddleware` for verification.

- **Domain enums** (`api/src/common/enums` and Prisma enums):
  - Business states such as roles, payment status, order status, delivery status, and address types exist both in Prisma (`schema.prisma`) and as TypeScript enums under `src/common/enums`. Keep these in sync when changing domain states.

## Frontend architecture (`frontend/`)

### Runtime and entrypoint

- The frontend is a React + Vite SPA using React Router.
- Entrypoint is `frontend/src/main.jsx`:
  - Wraps the app in `AuthProvider` for Firebase-based authentication state.
  - Sets up `BrowserRouter` with a top-level `Layout` and nested routes.
  - Defines routes for:
    - `/` → `Dashboard` (home page) with featured products and categories.
    - `/catalog` → `CatalogPage` using an in-memory `allProducts` array and `categories` metadata.
    - `/sale`, `/Profile`, `/basics`, `/tools`, `/paints`, `/add-product` mapped to their respective page components under `components/pages`.
    - `/login` → `LoginPage`, outside the main `Layout` shell.
  - Product and category data are currently mocked in `main.jsx` rather than fetched from the API.

### UI composition and design system

The UI follows an "atomic" composition pattern rooted in Tailwind CSS:

- **Atoms** (`frontend/src/components/atoms`):
  - Low-level, styled primitives built on top of Tailwind + Radix + custom CSS:
    - Visual components: `button`, `card`, `badge`, `checkbox`, `switch`, `table`, etc.
    - Form primitives: `input`, `label`, `textarea`, `select` wrappers.
    - Layout and feedback: `separator`, `skeleton`, `dialog`, `sheet`, `tooltip`, `sonner` toasts.
    - Infrastructure helpers: `ImageWithFallback`, `WhatsAppFloat`, `use-mobile`, `utils` for class handling.
  - These components encapsulate consistent styling with Tailwind utility classes and custom theme tokens defined in `tailwind.config.js` and `src/index.css`.

- **Molecules** (`frontend/src/components/molecules`):
  - Composite components built from atoms, geared toward specific UI patterns:
    - `FormField`: label + input + icon + validation visuals.
    - `ProductCard`: card representation of a single product (image, name, price, stock state).
    - `SocialButtons`, `UserMenu`, and login-specific molecules under `molecules/login`.

- **Organisms** (`frontend/src/components/organisms`):
  - Layout-level components and complex UI sections:
    - `Layout`: page shell used by the router; typically composes header, footer, and an outlet for nested routes.
    - `Header`, `Footer`, `HeroSection`, `CategorySection`, `ShoppingCart` and others for the main storefront UI.
    - Login flows under `organisms/login`:
      - `LoginForm`: email/password login form built with `FormField` and `Button`.
      - `SignupForm`: registration form with name/email/password and policy acknowledgment.

- **Pages** (`frontend/src/components/pages`):
  - Route-level screens composed from organisms and molecules (e.g., `Dashboard`, `CatalogPage`, `LoginPage`, `UserProfilePage`, `BasicsPage`, `ToolsPage`, `PaintsPage`, `AddProductPage`).
  - They consume props like `categories` and `products` from the router setup in `main.jsx` or from services/context.

- **Styling and theme**:
  - Tailwind configuration lives in `frontend/tailwind.config.js`, scanning `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
  - `frontend/src/index.css` wires Tailwind layers and defines a detailed design system:
    - CSS variables for colors (`--primary`, `--secondary`, `--muted`, etc.), typography, radii, and layout.
    - Light and dark theme variants (`:root` and `.dark`).
  - For new components, prefer reusing existing atoms/molecules and theme tokens rather than introducing ad-hoc styles.

### State management, auth, and data access

- **Auth context** (`frontend/src/context` and `frontend/src/hooks`):
  - `AuthContext` in `AuthContext.jsx` exposes an authentication context and a `useAuth` hook.
  - `AuthProvider` in `AuthProvider.jsx`:
    - Subscribes to Firebase Auth (`onAuthStateChanged`) using the `auth` instance.
    - Tracks `currentUser` and a `loading` flag.
    - Provides `{ currentUser, loading }` via `AuthContext.Provider` and renders children only after the initial auth check completes.
  - `useAuth` in `hooks/useAuth.js` wraps `useContext(AuthContext)` with a runtime safety check.
  - When building components that depend on authentication (e.g., profile, checkout), consume `currentUser` via `useAuth` and handle the `loading` state explicitly.

- **Firebase configuration** (`frontend/src/config/firebase.js`):
  - Initializes the Firebase app, analytics, and `auth` using a concrete config object for the `deposito-vitoria` project.
  - Exports `{ firebaseApp, analytics, auth }` for use by `AuthProvider` and any future Firebase integrations.
  - Future changes should prefer moving credentials into environment variables consumed by Vite (`import.meta.env`) instead of hard-coding values.

- **API client and services** (`frontend/src/services`):
  - `services/index.js`:
    - Creates a shared Axios instance `api` with:
      - `baseURL`: `import.meta.env.VITE_API_URL || "http://localhost:3000/"`.
      - JSON content-type header and a default timeout.
    - All frontend-to-backend HTTP calls should use this `api` instance to centralize base URL configuration and future concerns like interceptors.
  - Domain-specific services:
    - `products/ProductService.js`:
      - `ProductService.create(data)` → `POST /products` via the shared `api` client.
      - When calling this from the UI, make sure to attach a valid `Authorization: Bearer <token>` header compatible with backend JWT expectations.
    - `users/UserService.js`:
      - `setUser(userData)` → `POST /users` via the shared `api` client, logging success or errors to the console.
      - The backend currently exposes user listing and login under the `UserRoute`; ensure that routes and payloads are aligned when wiring this up.

## How the pieces fit together

- The **backend** models the full commerce domain (users, products, carts, orders, payments, deliveries, addresses) using Prisma and exposes Fastify routes grouped by domain. Controllers rely heavily on Zod-based DTOs for runtime validation and map to service methods that operate directly on Prisma models.
- The **frontend** is currently a storefront-like SPA with mocked catalog data, a themed component library built on Tailwind, and Firebase-based authentication context. It is already wired to talk to the backend via the shared Axios `api` client but only a small portion of the domain is integrated so far (e.g., product creation and user sync helpers).
- Environment configuration ties everything together:
  - `DATABASE_URL` + Prisma schema define the database.
  - `JWT_SECRET` secures backend authentication and must be consistent across token issuing and verification.
  - `VITE_API_URL` lets the frontend reach the API in different environments without hard-coding URLs.

When extending this project, keep the existing layering intact:
- In the backend, add or change behavior by updating Prisma schema → generating client → adding service methods → exposing them via controllers and routes, using DTOs and middlewares.
- In the frontend, add behavior by composing existing atoms/molecules/organisms, wiring them into pages and routes, and calling backend endpoints through the shared `api` client and domain services, while reading auth state from `useAuth`.