# 👟 Footster – E-Commerce Shoe Platform

> A full-stack e-commerce platform built to deliver a seamless online shopping experience with secure authentication, product management, and scalable architecture.

---

## 🚀 Overview

Footster is a modern e-commerce application designed for selling shoes online.
It provides a smooth shopping experience for users and a powerful admin panel for managing products, orders, and users.

The platform focuses on performance, security, and scalability using a clean MERN stack architecture.

---

## ✨ Features

### 🛍 Customer Experience
- 🔐 Secure authentication (JWT + HTTP-only cookies)
- 🛒 Add to cart & manage cart
- ❤️ Wishlist functionality
- 📦 Order placement & tracking
- 📱 Fully responsive UI

### 🧑‍💼 Admin Panel
- 📦 Product management
- 🏷 Category & inventory control
- 📊 Order management
- 👥 User management

---

## 🧩 Modules

### 👤 User
- Browse products
- View product details
- Add to cart
- Place orders
- Manage profile

### 🛠 Admin
- Add / edit / delete products
- Manage orders & status
- Manage users

---

## 🛠 Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Other Tools
- JWT Authentication
- HTTP-only Cookies
- Role-based Authorization
- Git & GitHub

---

## 📁 Folder Structure

```bash
.
├── footster-frontend/         # Customer frontend
├── footster-backend/          # Backend API

```

## ⚙️ Installation & Setup

### Clone the repository & install dependencies
```bash
  git clone <https://github.com/anjadkt/footster.git>
  cd footster
  npm install
```

### Setup environment variables
- Create a .env file inside footster-backend
```bash
  
MONGO_URL    #mongo db url
PORT         #port
SECRET_KEY   #jwt secret
FRONT_URL    #frontend url

```

- Create a .env footster-frontend
```bash
VITE_API_URL #backend url
```

### Run the project
```bash
# Start backend
cd footster-backend 
npm run dev  # dev ts files
npm run start #run files

# Start frontend apps
cd footster-frontend & npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /user/register | Register new user |
| POST | /user/login | User login |
| GET | /user/login | Login (alternate route) |
| GET | /user/logout | Logout user |
| GET | /user/details | Get logged-in user details |
| GET | /user/all | Get all users |
| GET | /products | Get all products |
| GET | /products/:id | Get single product |
| GET | /cart | Get user cart |
| POST | /cart | Add item to cart |
| PUT | /cart | Remove item from cart |
| POST | /cart/:action | Increase / decrease item quantity |
| GET | /wishlist | Get wishlist |
| POST | /wishlist | Add / remove wishlist item |
| GET | /wishlist/favorite | Get favorite products |
| POST | /address | Add new address |
| GET | /address | Get user addresses |
| POST | /user/orders | Place order |
| GET | /user/orders/all | Get user orders |
| GET | /user/orders/:id | Get single order |
| POST | /admin/register | Register admin |
| GET | /admin/logout | Admin logout |
| GET | /admin/dashboard | Get dashboard analytics |
| GET | /admin/products/all | Get all products (admin) |
| POST | /admin/products/add | Add new product |
| PUT | /admin/products/update | Update product |
| PUT | /admin/products/remove | Remove product |
| GET | /admin/order/all | Get all orders (admin) |
| POST | /admin/order/status | Update order status |
| GET | /admin/users | Get user details (admin) |
| GET | /admin/users/all | Get all users (admin) |
| GET | /admin/users/:id | Get single user (admin) |
| PUT | /admin/users/updateStatus | Update user/order status |
| GET | /admin/users/:id/block | Block user |

---

## 🖥 Screenshots
![home page](/screenshots/image.png)
![cart page](/screenshots/image-1.png)
![orders page](/screenshots/image-2.png)
![admin dashboard](/screenshots/image-3.png)
![admin products](/screenshots/image-4.png)

## 🌍 Deployment

- **Frontend**: https://footster.vercel.app (Vercel)
- **Backend** : Hosted on Render

## 🧠 Key Learnings
- Built a scalable full-stack e-commerce system using MERN stack
- Implemented secure authentication with JWT and cookie-based sessions
- Designed modular frontend architecture using Redux Toolkit
- Developed RESTful APIs with proper MVC structure
- Implemented role-based access control for admin and users
- Optimized performance and state handling for better UX
- Structured project for scalability and maintainability

## 👨‍💻 Author

**ANJAD KT**

- Portfolio: https://anjad.netlify.app  
- LinkedIn: https://www.linkedin.com/in/anjadkt 