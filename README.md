# Mini ERP CRM System

A full-stack ERP and CRM application designed to manage customers, products, inventory, and sales operations efficiently.

---

## 📌 Project Overview

Mini ERP CRM is a business management system that helps organizations manage their daily operations through a centralized platform.

The system provides secure authentication, customer management, product management, inventory tracking, and challan management with a modern React frontend and Node.js backend.

---

# ✨ Features

## Authentication
- JWT Based Authentication
- Secure Login System
- Password Encryption
- Role Based Access Control

## Dashboard
- Overview of business activities
- Quick access to modules

## Customer Management
- Add new customers
- View customer details
- Update customer information
- Delete customers

## Product Management
- Add products
- View products
- Search products
- Update products
- Delete products

## Inventory Management
- Track product stock
- Manage inventory details
- Stock availability monitoring

## Challan Management
- Create challans
- Manage sales transactions
- Track challan records

## API Features
- REST API Integration
- Swagger API Documentation
- Secure API Routes

---

# 🛠 Technologies Used

## Frontend

- React.js
- TypeScript
- Vite
- Axios
- React Router DOM
- CSS

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- Swagger Documentation
- bcrypt Password Hashing

## Database

- PostgreSQL

---

# 📂 Project Structure

```
mini-erp-crm
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend
│   │
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── config
│   │   └── server.ts
│   │
│   ├── prisma
│   │   └── schema.prisma
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/mini-erp-crm.git
```

Navigate into project:

```bash
cd mini-erp-crm
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
DATABASE_URL="postgresql://username:password@localhost:5432/erpcrm"
JWT_SECRET="your_secret_key"
PORT=5000
```

---

## Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Start Backend Server

Development mode:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

1. User enters email and password
2. Backend validates credentials
3. JWT token is generated
4. Token is stored in frontend
5. User accesses protected routes

---

# 📚 API Documentation

Swagger API documentation available at:

```
http://localhost:5000/api-docs
```

---

# 🔗 API Modules

## Authentication

```
POST /api/auth/login
```

## Customers

```
GET    /api/customers
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

## Products

```
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## Inventory

```
GET /api/inventory
```

## Challans

```
GET    /api/challans
POST   /api/challans
```

---

# 🖥 Application Screens

- Login Page
- Dashboard
- Customer Management
- Product Management
- Inventory Management
- Challan Management

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Role Based Authorization
- Environment Variable Protection

---

# 🚀 Future Enhancements

- Advanced Reporting Dashboard
- Invoice Generation
- Email Notifications
- Payment Tracking
- Sales Analytics
- Mobile Application Support

---

# 👩‍💻 Author

**Gayathri Banoth**

Mini ERP CRM System

---

# 📄 License

This project is developed for educational and learning purposes.