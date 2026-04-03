# Project Architecture & Documentation

## Overview

The CrazyApp platform is a modern, full-stack web application built using the Next.js framework (utilizing the App Router). The repository is structured to seamlessly weave a highly interactive frontend with a secure, serverless backend.

This document breaks down the organization and implementation details of both the frontend (Client) and backend (Server/API/Database).

---

## 1. Frontend Architecture

The frontend is specifically designed to provide a "premium SaaS" experience—utilizing high-performance React patterns, atomic CSS classes, and fluid animation libraries to maximize user engagement. 

### Key Technologies
* **Framework:** Next.js (React)
* **Routing:** App Router (`app/` directory)
* **Styling:** Tailwind CSS (`@tailwindcss/postcss`) 
* **Animations:** Framer Motion (for enter/hover states, view-port scroll animations)
* **Icons:** Lucide React
* **Data Visuals:** Recharts (for administrative reporting/stats)

### Directory Structure & Implementations
* **`app/` Pages Configuration:**
  - Standard marketing pages: `/`, `/about`, `/careers`, `/blog`, `/pricing`
  - Authentication pages: `/login`, `/register`
  - Platform Product Pages: Heavy focus on media categories such as `/graphics`, `/motion-graphic`, `/video-templates`, and `/stockvideo`. These often rely on complex sub-layouts and dynamic category viewing.
  - Control Panels: The `/admin/` ecosystem likely hosts protected pages where platform managers can upload media, review logs, or view analytical stats.
* **`components/` Directory:**
  - Holds reusable layout elements. Examples include the global `Navbar` (which has mega-menu mobile/desktop handling), `Footer`, `Hero` modules, and section wrappers (`Content`, `Collections`).
  - Abstracting components outward keeps the Next.js `page.tsx` files lean and heavily focused on page composition rather than granular UI logic.
* **State Management & Data:**
  - Uses `SessionProvider` (from NextAuth) at the highest `layout.tsx` level to supply authentication contexts to the frontend globally. The frontend detects unauthenticated vs. authenticated states natively.

---

## 2. Backend Architecture

The backend capitalizes on Next.js's embedded serverless functions to act as a secure, fast API layer that bridges the client and the core databases/services.

### Key Technologies
* **Environment:** Node.js / Next.js Serverless Route Handlers
* **Database:** MongoDB
* **ORM / Datamapper:** Mongoose
* **Authentication:** NextAuth.js (supporting credentials, JWT strategies) + `bcryptjs` for local password hashing.
* **Media Storage:** Cloudinary
* **Payments:** Razorpay

### API Layer (`app/api/`)
The `api` folder is heavily modularized to maintain segregation of logic:
* **Authentication & User Mgmt**: 
  - `auth/`: Ties heavily into NextAuth mechanisms for login/logout/session checks.
  - `register/`: Endpoint exclusively used to ingest new users, validate their parameters, hash their password, and save to MongoDB.
* **Payment Ecosystem (Razorpay)**:
  - `create-order/`: A secure endpoint where the backend initiates an order ID internally with Razorpay using server secrets to prevent tampering.
  - `verify-payment/`: Once the client actually pays, this endpoint confirms the cryptographic signature emitted by Razorpay.
  - `razorpay-webhook/`: A webhook listener for external async confirmations originating directly from the payment processor to update user status safely without relying on the client side remaining open.
* **Media Handling**:
  - `upload/` & `media/`: Handles interactions between the server and Cloudinary. Usually generates secure upload signatures or parses incoming streaming file data. 
* **Administrative**:
  - `admin/` & `stats/`: Fetches metrics and provides administrative mutations. Generally guarded by admin-only role checks.
* **Miscellaneous**:
  - `newsletter/`: Ingests and processes user subscription emails.

### Database & Models
* **`lib/`**: Contains core initialization scripts, most critically the MongoDB connection instance that prevents connection exhaustion in a serverless ecosystem (e.g. `dbConnect`).
* **`models/`**: Defines strict schema validations for MongoDB.
  - `User.ts`: Contains blueprints for the platform's users (e.g., username, email, encrypted password, roles like 'admin' or 'user', and subscription statuses).
  - `Media.ts`: Handles references to assets hosted on Cloudinary, keeping track of titles, category IDs, tags, public URIs, and potentially view/download counts.

### Security layer
* **`middleware.ts`**: The edge middleware script acts as a proactive security gateway. It is configured to inspect incoming requests (checking JWT tokens/cookies) and intelligently reroute unauthenticated users attempting to hit `/admin` or secured product downloads—ensuring the backend APIs and secure frontend routes are guarded tightly.
