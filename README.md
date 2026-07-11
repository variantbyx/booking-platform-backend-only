# Booking Platform Backend

A clean, production-grade service booking and scheduling backend API built using **NestJS**, **TypeORM**, and **PostgreSQL**. The platform features complete user authentication (JWT), services catalog management, booking requests with robust relationship validation, global exception filters, and automated interactive API documentation (Swagger).

---

## 🛠️ Tech Stack

* **Framework:** [NestJS](https://nestjs.com/) (v11.x)
* **Language:** TypeScript
* **Database & ORM:** PostgreSQL + [TypeORM](https://typeorm.io/)
* **Authentication:** Passport JWT
* **Validation:** Class-validator & Class-transformer
* **Documentation:** Swagger (OpenAPI)

---

## 📂 Folder Structure

```text
src/
├── app.module.ts            # Root application module
├── main.ts                  # Bootstrapping, validation pipe, exception filter & Swagger
├── auth/                    # JWT authentication module, guards, and passport strategy
│   ├── dto/                 # Auth DTOs (Register, Login)
│   ├── jwt.strategy.ts      # Passport JWT strategy configuration
│   └── jwt-auth.guard.ts    # Route guard for endpoints requiring login
├── bookings/                # Booking module (CRUD endpoints, validation, and schema)
│   ├── dto/                 # Booking DTOs (Create, Update)
│   ├── entities/            # TypeORM Booking entity & BookingStatus Enum
│   ├── bookings.controller.ts
│   └── bookings.service.ts
├── services/                # Services Catalog module (CRUD endpoints)
│   ├── dto/                 # Services DTOs
│   ├── entities/            # TypeORM Service entity
│   ├── services.controller.ts
│   └── services.service.ts
├── users/                   # User account management module
│   ├── entities/            # User entity
│   └── users.service.ts
└── common/
    └── filters/
        └── http-exception.filter.ts # Global HttpException JSON formatter
```

---

## 🔒 Environment Variables

Create a `.env` file in the root directory of the project and define the following variables:

```env
# Database connection settings
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=admin123
DB_NAME=booking_platform

# Authentication settings
JWT_SECRET=superSecretKey123456789
JWT_EXPIRES_IN=1d

# Application Port
PORT=3000
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Run Database
Ensure you have a PostgreSQL database instance running matching the variables configured in your `.env` file.

### 3. Start Development Server
```bash
npm run start:dev
```
The server will boot on `http://localhost:3000`.

---

## 📘 Interactive API Documentation (Swagger)

Once the application is running, you can access the beautiful interactive Swagger documentation at:
👉 **[http://localhost:3000/api](http://localhost:3000/api)**

Through Swagger, you can inspect:
- Full schemas of all entities and inputs.
- Authentication paths.
- Create, Read, Update, and Delete endpoints for both **Services** and **Bookings**.
- Built-in Bearer Authorization testing directly from your browser.

---

## 🧪 Postman Collection

A pre-configured Postman Collection is included in the project root:
* File: `booking-platform.postman_collection.json`
* How to use:
  1. Open Postman.
  2. Click **Import** and select `booking-platform.postman_collection.json`.
  3. The collection imports with all folders (Auth, Services, Bookings) and requests pre-filled with raw JSON payloads and authentication headers.
  4. Once you log in, the `access_token` is automatically saved in collection variables and passed to all protected endpoints.

---

## 🧼 Global Exception & Validation Response

Instead of receiving inconsistent Nested NestJS validation formats, errors are formatted globally into clear, consistent API payloads. 

### Successful Error Formatting Example:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "customerPhone must be a valid phone number",
    "status must be one of the following values: Pending, Confirmed, Cancelled, Completed"
  ],
  "path": "/bookings",
  "timestamp": "2026-07-11T13:51:52.000Z"
}
```

---

## 🧪 Running Unit Tests
You can execute unit tests using Jest:
```bash
# Run all unit tests
npm run test

# Run bookings-specific tests only
npx jest src/bookings
```
