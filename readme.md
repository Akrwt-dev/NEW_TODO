# 📝 MERN Todo Application

A full-stack Todo application built using the **MERN stack (MongoDB, Express, React, Node.js)** with user authentication.  
Each user can manage their own todos securely with features like adding, updating, deleting, and filtering tasks.

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Axios
- CSS / Tailwind (optional)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Authentication:**
- JSON Web Token (JWT)
- bcrypt for password hashing

---

## 🎯 Project Objectives

- Learn full MERN stack integration  
- Implement authentication and authorization  
- Practice CRUD operations  
- Build confidence by completing a real-world project  
- Understand API design and database relationships  

---

## ✨ Core Features

### 🔐 Authentication
- User Registration  
- User Login  
- Password hashing using bcrypt  
- JWT-based authentication  
- Logout functionality  
- Protected routes (only logged-in users can access todos)  

---

### ✅ Todo Management (CRUD)

Each logged-in user can:

- ➕ Create a new todo  
- 📄 View all their todos  
- ✏ Update a todo title  
- ☑ Mark a todo as completed / uncompleted  
- ❌ Delete a todo  

---

### 🧑 User-Specific Data

- Each user has their own todo list  
- Users cannot see or modify other users’ todos  
- Todos are linked to a user using `userId`  

---

## 📦 Database Models

### 👤 User Model
- name (String)  
- email (String, unique)  
- password (String, hashed)  
- createdAt (Date)  

---

### 🗒 Todo Model
- title (String)  
- completed (Boolean)  
- userId (Reference to User)  
- createdAt (Date)  

---

## 🌐 API Endpoints

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

---

### Todo Routes (Protected)
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/todos | Create new todo |
| GET | /api/todos | Get all todos of logged-in user |
| PUT | /api/todos/:id | Update todo |
| DELETE | /api/todos/:id | Delete todo |

---

## 🖥 Frontend Pages

- Login Page  
- Register Page  
- Todo Dashboard  
- Add Todo Form  
- Todo List  
- Logout Button  

---

## 🛡 Security Features

- Passwords are hashed before saving to database  
- JWT token used for authentication  
- Protected routes using middleware  
- Users can only access their own data  

---

## 🌟 Extra Features (Optional but Recommended)

- ⏰ Due date for todos  
- 🔍 Search todos  
- 🎯 Filter todos (completed / pending)  
- 📊 Task counter (total, completed, pending)  
- 🌙 Dark mode  
- 📱 Responsive UI  

---

## 📁 Folder Structure

### Backend
