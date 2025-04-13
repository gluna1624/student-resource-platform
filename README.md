# Student Resource Platform

This project is a fullstack implementation based on the Bezkoder tutorial series.

## 🔧 Tech Stack

- **Backend:** Node.js + Express + Sequelize + MySQL
- **Frontend:** React + TypeScript + Axios
- **Authentication:** JWT-based auth with role support (`admin`, `user`)

## 🧱 Project Structure

my-tutorial-app/
├── server.js               # Backend entry point
├── app/                    # Express app folder
│   ├── config/             # Database and auth config
│   ├── controllers/        # Auth and resource logic
│   ├── middleware/         # JWT and signup validation
│   ├── models/             # Sequelize models and associations
│   └── routes/             # Route definitions
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Resource UI
│   │   ├── services/       # Axios API layer
│   │   └── types/          # Type definitions (e.g., IResource)
└── README.md               # This file


## 🔐 Authentication

- Signup and signin supported via JWT
- Role assignment and verification (`user_roles` join table)
- Authenticated routes require `x-access-token` header

## 📦 Features Completed

- ✅ User signup/login
- ✅ JWT authentication with role assignment
- ✅ RESTful resource management (create/read/update/delete)
- ✅ React frontend with Axios + TypeScript
- ✅ Protected routes tested via curl

## 🧪 Tested With

- curl
- Node.js v22+
- MySQL (manually created `testdb`)

---

## 🚀 How to Run

### Backend

```bash
cd my-tutorial-app
npm install
node server.js

### Frontend
cd client
npm install
npm start