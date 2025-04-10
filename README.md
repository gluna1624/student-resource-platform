markdown

# Student Resource Sharing Platform

A web application for students to share and access study resources, now converted to TypeScript for improved type safety and maintainability.

## Overview
This app allows students to:
- List, view, and upload study resources (with file uploads).
- Filter resources by category (e.g., Math, Physics).
- Log in/register with JWT authentication.
- Manage resources via an admin panel (for admins).
- Comment on resources and view user profiles.

## Features
- **Resource Listing**: Animated cards with filtering by category.
- **Resource Details**: Displays title, description, category, uploader, and comments.
- **Upload**: Authenticated users can upload resources with categories and files.
- **Search**: Filter resources by title/description.
- **Login/Registration**: JWT-based authentication with a navbar toggle for "Login"/"Logout" and "Register".
- **Admin Panel**: Admins can delete resources (accessible at `/admin`).
- **Comments**: Users can comment on resources.
- **Categories**: Tag and filter resources by category.
- **User Profiles**: View a user’s uploaded resources at `/users/:id`.
- **Styling**: Gradient navbar, Poppins font, hover effects, orange-themed background.

## Tech Stack
- **Frontend**: React (TypeScript, Vite), axios, react-router-dom, jwt-decode, CSS.
- **Backend**: Node.js, Express, MySQL (mysql2), bcryptjs, jsonwebtoken.
- **Database**: MySQL with tables for `resources`, `users`, and `comments`.

## Setup Instructions

### Prerequisites
- Install Homebrew, Node.js, MySQL, and Git:
  ```bash
  brew install node mysql git

Clone the repo:
bash

git clone <repository-url>
cd student-resource-platform

Backend Setup
Navigate to the server folder:
bash

cd server

Install dependencies:
bash

npm install express mysql2 cors bcryptjs jsonwebtoken

Start MySQL:
bash

brew services start mysql

Set up the database (password: root123):
bash

mysql -u root -p

Then run:
sql

CREATE DATABASE student_platform;
USE student_platform;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin TINYINT(1) DEFAULT 0
);
CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  user_id INT,
  file_path VARCHAR(255),
  file_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resource_id INT,
  user_id INT,
  content TEXT,
  FOREIGN KEY (resource_id) REFERENCES resources(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

Start the backend:
bash

node index.js

Runs on http://localhost:5001.

Frontend Setup
Navigate to the client folder:
bash

cd client

Install dependencies:
bash

npm install
npm install typescript @types/react @types/react-dom @types/node @types/jwt-decode --save-dev
npm install @types/axios @types/react-router-dom --save

Start the frontend:
bash

npm run dev

Runs on http://localhost:5173.

Running the App
Start MySQL:
bash

brew services start mysql

Start the backend (in one terminal):
bash

cd ~/Desktop/student-resource-platform/server && node index.js

Start the frontend (in another terminal):
bash

cd ~/Desktop/student-resource-platform/client && npm run dev

Visit http://localhost:5173, log in as test (password: test123), and use the app!

Current Status
Done: Converted frontend to TypeScript, fixed styling issues (centered layout, orange theme), restored routing for login/upload/admin.

Next: Convert backend to TypeScript, add voting/rating system for resources.

Troubleshooting
MySQL Not Starting: Run brew services start mysql.

Port Conflict: If “port already in use,” stop the process with Ctrl+C and retry.

No Data in Resource List: Ensure the backend is running and the database has data.

