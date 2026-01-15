# 📅 Calendar API: Clean Architecture with Node.js

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1_Beta-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)

> **A robust backend system demonstrating how to apply Object-Oriented Programming (OOP) principles and Layered Architecture to modern Node.js applications.**

## 📖 Overview

This repository serves as a reference for building scalable Node.js applications. Unlike typical functional-style Express apps, this project uses a **Class-Based Architecture** with **Manual Dependency Injection**.

It separates concerns strictly between:

- **Routes:** Definition of endpoints.
- **Controllers:** Handling HTTP Request/Response lifecycle.
- **Services:** Pure business logic and database interaction.
- **Middlewares:** JWT validation and ID verification.

## 🏗️ Architecture & Design Patterns

The application follows a **Layered Architecture** to ensure maintainability and testability.

### Key Design Decisions:

1. **Manual Dependency Injection:** Controllers receive their Services via constructor injection, making the code modular and easier to mock for testing.

```typescript
// Example from AuthRoutes.ts
const authService = new AuthService();
const authController = new AuthController(authService); // 💉 Injection
```

2. **Express 5 (Modern Standard):** Utilizes the latest Express version for improved promise handling and performance.

3. **Strict Typing:** Full TypeScript implementation with DTOs (Data Transfer Objects) to validate data flow.

## 🚀 Key Features

- **🔐 Secure Authentication:** Full JWT flow including Login, Register, and **Token Renewal** (`/renew`).
- **🛡️ Guarded Routes:** Custom `AuthMiddleware` protects sensitive endpoints.
- **📅 Event Management:** Complete CRUD operations for calendar events.
- **⚙️ ID Validation:** `MongoidMiddleware` ensures MongoDB ObjectIDs are valid before hitting the controller.
- **🐳 Dockerized Dev:** Includes Docker Compose configuration for instant MongoDB setup.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript 5.9
- **Framework:** Express 5.1.0
- **Database:** MongoDB (via Mongoose 8)
- **Security:** `bcryptjs` (Hashing), `jsonwebtoken` (JWT)
- **Utilities:** `dayjs` (Date manipulation), `env-var` (Strict Environment Config)
- **Dev Tools:** `tsx` (TypeScript Execution), Docker

## 📂 Project Structure

```text
src/
├── auth/            # Auth Module (Routes, Controller)
├── event/           # Event Module (Routes, Controller)
├── services/        # Business Logic Layer
├── middlewares/     # Interceptors (Auth, Validation)
├── models/          # Mongoose Schemas
└── app.ts           # App Entry Point & Server Config
```

## 🧪 How to Run

### Prerequisites

- Node.js v18+
- Docker (for Database)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/huderdcv/calendar-app-backend.git
```

2. Start Database:

```bash
docker-compose up -d
```

3. Install Dependencies:

```bash
npm install
```

4. Configure Environment:  
   Rename `.env.template` to `.env` and add your JWT Seed.

5. Run in Development Mode:

```bash
npm run dev
```
