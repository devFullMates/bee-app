<h1 align="center">
  🐝🍯 bee app 🍯🐝
</h1>

<p align = "justify">
	:green_circle:  Honey Products Store.
</p>

<p align = "justify">
	:globe_with_meridians: Live at <a href="https://bij-zonderezaken.nl/">https://bij-zonderezaken.nl/</a>
</p>

## Overview
This web application showcases various honey-based products such as honey jars, lip balms, and other items made by a beekeeper. It allows users to browse through the available products and offers features for customers to be notified when out-of-stock items become available again.

- **Production**: [https://bij-zonderezaken.nl/](https://bij-zonderezaken.nl/)
- **Backend**: [webhook-api-contentful-bees](https://github.com/larissakoliveira/webhook-api-contentful-bees)

## Features
- **Product Catalog**: Display of products with product cards that include:
  - Product name
  - Product image
  - "More information" button that opens a modal with the product's detailed description.
- **Stock Notifications**: 
  - If a product is out of stock, a "Notify Me" button will appear. Users can enter their email address to be notified when the product is back in stock.
  - If a product is in stock, no "Notify Me" button will be displayed.
  - The user's selected language is saved with the registration so the backend can send the notification in that language.
- **Multi-Language Support**: The application supports Dutch, English, Portuguese and German allowing users to switch between languages for a more personalized experience.

## Tech Stack
### Frontend:
- **React 18** (TypeScript) for building the user interface, ensuring type safety and smooth development experience.
- **Vite** as the dev server and build tool.
- **Tailwind CSS** for styling.
- **i18next / react-i18next** for translations (`src/locales/{nl,en,pt,de}`).
- **Contentful** CMS is used to manage product data (name, description, images, and stock status) dynamically:
  - Products are fetched through the Contentful **GraphQL Content API** (`graphql-request`).
  - Email registrations are created as `emailRegistration` entries through the Contentful **Management API**.
  
### Backend:
- **Contentful Webhook**: A webhook triggers an event when product stock status changes. This ensures that email notifications are sent as soon as the stock is updated.
- **Nodemailer**: Handles sending email notifications to users who sign up for stock updates.

Check out the backend project: [webhook-api-contentful-bees](https://github.com/larissakoliveira/webhook-api-contentful-bees)
  
## How It Works
1. **Product Management**: The website owner can manage products directly through Contentful, including adding/removing products and updating stock status.
2. **Customer Experience**: Users can browse products and request notifications for out-of-stock items. When an item is back in stock, an email will be sent to those who signed up.
3. **Language Switching**: The website allows users to switch between different languages, providing an international user experience.

## Installation & Setup
### Prerequisites
- Node.js 18+ and npm
- A Contentful space with the `product` and `emailRegistration` content types

### Steps
1. Clone this repository and install the dependencies:

   ```bash
   git clone git@github.com:devFullMates/bee-app.git
   cd bee-app
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values from your Contentful settings:

   ```bash
   cp .env.example .env
   ```

   | Variable Name                                    | Description                                 |
   |--------------------------------------------------|---------------------------------------------|
   | `VITE_CONTENTFUL_SPACE_ID`                       | Your Contentful space ID                    |
   | `VITE_CONTENTFUL_ACCESS_TOKEN_DELIVERY_API`      | Your Contentful delivery API token (HTTP GET) — *Settings → API keys* |
   | `VITE_CONTENTFUL_ACCESS_TOKEN_MANAGEMENT`        | Your Contentful management API token (HTTP POST, DELETE, PATCH, PUT) — *Settings → CMA tokens* |

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

## Available Scripts
| Command             | Description                                         |
|---------------------|-----------------------------------------------------|
| `npm run dev`       | Start the Vite development server                   |
| `npm run build`     | Type-check and build for production into `dist/`    |
| `npm run preview`   | Serve the production build locally                  |
| `npm run lint`      | Run ESLint                                          |
| `npm run typecheck` | Run the TypeScript compiler without emitting files  |
| `npm run test`      | Run tests with Vitest                               |
| `npm run analyze`   | Inspect bundle size with source-map-explorer (requires a build with source maps) |

## Project Structure
```
src/
├── assets/       # Images used by components
├── components/   # Reusable UI components (Card, Modal, Header, Flag, ErrorBoundary)
├── constants/    # App configuration
├── hooks/        # Custom React hooks
├── locales/      # Translation files (nl, en, pt, de)
├── pages/        # Page components (HomePage)
├── routes/       # Route definitions
├── services/     # Contentful GraphQL client, queries and API calls
├── utils/        # Helpers (input sanitization / validation)
└── i18n.ts       # i18next setup
```
