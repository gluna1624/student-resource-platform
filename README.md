# Student Resource Sharing Platform

## Overview
This is a web application built for students to share and access study resources. It features a flashy UI with a React frontend, a Node.js/Express backend, and a MySQL database. Users can list resources, view details, upload new resources (after login), search, manage via an admin panel, and now categorize resources with tags.

## Features
- **Resource Listing**: Animated cards with a bounce-in effect, filterable by category.
- **Resource Details**: Shows title, description, category, and comments.
- **Upload**: Authenticated users can add resources with a category (e.g., "Math").
- **Search**: Filters by title/description.
- **Login System**: Register/login with JWT auth; navbar toggles "Login"/"Logout".
- **Admin Panel**: Admins can delete resources; accessible via homepage button and navbar.
- **Comments**: Users can comment on resources in the detail view.
- **Categories**: Tag resources and filter them on the homepage.
- **Styling**: Gradient navbar, Poppins font, hover effects.

## Tech Stack
- **Frontend**: React (Vite), axios, react-router-dom, jwt-decode, CSS.
- **Backend**: Node.js, Express, MySQL (mysql2), bcryptjs, jsonwebtoken.
- **Database**: MySQL with `resources` (id, title, description, category), `users` (id, username, password, isAdmin), `comments` (id, resource_id, user_id, content).
- **Tools**: Homebrew, Git, VS Code.

## Setup Instructions
1. **Environment**:
   - Install: `brew install node mysql git`.
   - Folder: `~/Desktop/student-resource-platform` with `client` and `server`.
2. **Backend**:
   - `cd server`, `npm init -y`, `npm install express mysql2 cors bcryptjs jsonwebtoken`.
   - Start MySQL: `brew services start mysql`.
   - Database: `mysql -u root -p`, `CREATE DATABASE student_platform;`.
   - Tables:
     ```sql
     USE student_platform;
     CREATE TABLE resources (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, category VARCHAR(50));
     CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50), password VARCHAR(255), isAdmin TINYINT(1) DEFAULT 0);
     CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, resource_id INT, user_id INT, content TEXT, FOREIGN KEY (resource_id) REFERENCES resources(id), FOREIGN KEY (user_id) REFERENCES users(id));
     ```
   - Run: `node index.js`.
3. **Frontend**:
   - `cd client`, `npm create vite@latest . -- --template react`, `npm install axios react-router-dom jwt-decode`.
   - Run: `npm run dev`.
4. **Git**:
   - `git init`, `git add .`, `git commit -m "Add admin and categories"`.
   - Push: `git push origin HEAD:gluna1624`.

## Progress
- **Done**: Full app with login, admin panel, comments, categories, GitHub sync.
- **Next**: Maybe user profiles or file uploads?

## Morning Updates (March 23, 2025)
This morning, we enhanced the platform with two key features:
- **Admin Section**: Added an admin panel at `/admin` for deleting resources, restricted to users with `isAdmin = 1` (e.g., "test" user). Added an "Admin Panel" button on the homepage (`ResourceList.jsx`) and a navbar link, both visible only to admins, using JWT token checks.
- **Categories**: Introduced a `category` column to the `resources` table. Users can now tag resources (e.g., "Math," "Physics") during upload (`ResourceUpload.jsx`), filter them on the homepage with a dropdown (`ResourceList.jsx`), and see the category in the detail view (`ResourceDetail.jsx`). Updated backend routes to support category filtering.

## Troubleshooting
- MySQL: Run `brew services start mysql`.
- Port: Uses 5001.
- Search: Ensure database has data.
- Routing: Verify all routes in `App.jsx`.