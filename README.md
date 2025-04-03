# Student Resource Sharing Platform

## Overview
This is a web application built for students to share and access study resources. It features a flashy UI with a React frontend, a Node.js/Express backend, and a MySQL database. Users can list resources, view details, upload new resources (after login), search, manage via an admin panel, categorize resources, view user profiles, and now register directly in the app.

## Features
- **Resource Listing**: Animated cards with a bounce-in effect, filterable by category.
- **Resource Details**: Shows title, description, category, uploader (linked to profile), and comments.
- **Upload**: Authenticated users can add resources with a category.
- **Search**: Filters by title/description.
- **Login System**: Register/login with JWT auth; navbar toggles "Login"/"Logout".
- **Admin Panel**: Admins can delete resources; accessible via homepage button and navbar.
- **Comments**: Users can comment on resources in the detail view.
- **Categories**: Tag resources and filter them on the homepage.
- **User Profiles**: View a user’s uploaded resources at `/users/:id`.
- **Registration**: New users can sign up at `/register` via a dedicated page.
- **Styling**: Gradient navbar, Poppins font, hover effects.

## Tech Stack
- **Frontend**: React (Vite), axios, react-router-dom, jwt-decode, CSS.
- **Backend**: Node.js, Express, MySQL (mysql2), bcryptjs, jsonwebtoken.
- **Database**: MySQL with `resources` (id, title, description, category, user_id), `users` (id, username, password, isAdmin), `comments` (id, resource_id, user_id, content).
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
     CREATE TABLE resources (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, category VARCHAR(50), user_id INT, FOREIGN KEY (user_id) REFERENCES users(id));
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
- **Done**: Full app with login, admin panel, comments, categories, user profiles, registration, GitHub sync.
- **Next**: Maybe file uploads or a voting system?

## Morning Updates (March 23, 2025)
This morning, we enhanced the platform with two key features:
- **Admin Section**: Added an admin panel at `/admin` for deleting resources, restricted to users with `isAdmin = 1` (e.g., "test" user). Added an "Admin Panel" button on the homepage (`ResourceList.jsx`) and a navbar link, both visible only to admins, using JWT token checks.
- **Categories**: Introduced a `category` column to the `resources` table. Users can now tag resources (e.g., "Math," "Physics") during upload (`ResourceUpload.jsx`), filter them on the homepage with a dropdown (`ResourceList.jsx`), and see the category in the detail view (`ResourceDetail.jsx`). Updated backend routes to support category filtering.

## Afternoon Updates (March 23, 2025)
This afternoon, we kept the momentum going with more enhancements:
- **User Profiles**: Added a `user_id` column to `resources` to track who uploaded what. Created a profile page at `/users/:id` (`UserProfile.jsx`) showing a user’s uploaded resources, linked from usernames in `ResourceDetail.jsx`. Fixed resource list and search issues by switching to `LEFT JOIN` in backend queries to include resources with `null` `user_id`.
- **Registration Page**: Added a `/register` route with `Register.jsx`, allowing new users to sign up directly in the app. Updated the navbar to show a “Register” link when logged out, redirecting to `/login` after successful registration.

## Troubleshooting
- MySQL: Run `brew services start mysql`.
- Port: Uses 5001.
- Search: Ensure database has data; use `LEFT JOIN` for resources with no `user_id`.
- Routing: Verify all routes in `App.jsx`.

## April 3, 2025 - File Uploads, Downloads, and GitHub Push

Today, we finalized the file upload feature for the Student Resource Sharing Platform:
- **File Uploads**: Tested and debugged file uploads in `ResourceUpload.jsx` and `server/index.js`, using `multer` to save files to `uploads/`. Successfully uploaded "Informal Writing assigment 3 .docx" (`id: 9`), stored in the `resources` table with `file_path` and `file_name`.
- **Card Clickability**: Fixed an issue where resource cards (e.g., "Applied Physics" and "informal Writing") weren’t clickable in `ResourceList.jsx`. Added explicit `<Link>` styling and ensured unique keys, making all cards navigable.
- **File Downloads**: Added a download link in `ResourceDetail.jsx`, connecting to `GET /resources/:id/file` to retrieve files (e.g., downloaded "Informal Writing assigment 3 .docx" from `/resources/9`).
- **GitHub Push**: Staged all changes (`git add .`), committed with `git commit -m "Added file upload and download functionality, fixed card clickability"`, and force-pushed to the `gluna1624` branch of `LIUSpring2025/CS-691` using `git push origin HEAD:gluna1624 --force`.

The platform now supports uploading, displaying, and downloading files, with all resources clickable in the "Shared Resources" section.

## Database Schema

The `student_platform` database supports the Student Resource Sharing Platform with three tables, designed to manage users, resources, and comments. Below is the detailed schema as of April 3, 2025:

### `users` Table
Stores user authentication and role data.

| Column     | Type         | Null | Key         | Default | Extra          | Description                  |
|------------|--------------|------|-------------|---------|----------------|------------------------------|
| `id`       | `INT`        | NO   | PRIMARY     | NULL    | AUTO_INCREMENT | Unique user identifier       |
| `username` | `VARCHAR(255)` | NO   |             | NULL    |                | User’s login name            |
| `password` | `VARCHAR(255)` | NO   |             | NULL    |                | Hashed password (bcrypt)     |
| `isAdmin`  | `INT`        | NO   |             | NULL    |                | Admin status (0 = no, 1 = yes) |

### `resources` Table
Holds shared resources, including optional file attachments.

| Column       | Type         | Null | Key         | Default | Extra          | Description                  |
|--------------|--------------|------|-------------|---------|----------------|------------------------------|
| `id`         | `INT`        | NO   | PRIMARY     | NULL    | AUTO_INCREMENT | Unique resource identifier   |
| `title`      | `VARCHAR(255)` | YES  |             | NULL    |                | Resource title               |
| `description`| `TEXT`       | YES  |             | NULL    |                | Resource description         |
| `category`   | `VARCHAR(50)` | YES  |             | NULL    |                | Resource category (e.g., Math) |
| `user_id`    | `INT`        | YES  | FOREIGN     | NULL    |                | Links to `users(id)`         |
| `file_path`  | `VARCHAR(255)` | YES  |             | NULL    |                | Server path to uploaded file |
| `file_name`  | `VARCHAR(255)` | YES  |             | NULL    |                | Original file name           |

- **Foreign Key**: `user_id` references `users(id)` (nullable, as some resources may predate user association).

### `comments` Table
Manages comments on resources.

| Column       | Type         | Null | Key         | Default | Extra          | Description                  |
|--------------|--------------|------|-------------|---------|----------------|------------------------------|
| `id`         | `INT`        | NO   | PRIMARY     | NULL    | AUTO_INCREMENT | Unique comment identifier    |
| `resource_id`| `INT`        | YES  | FOREIGN     | NULL    |                | Links to `resources(id)`     |
| `user_id`    | `INT`        | YES  | FOREIGN     | NULL    |                | Links to `users(id)`         |
| `content`    | `TEXT`       | YES  |             | NULL    |                | Comment text                 |

- **Foreign Keys**: 
  - `resource_id` references `resources(id)` (nullable, for flexibility).
  - `user_id` references `users(id)` (nullable, for legacy comments).

### Relationships
- One `user` can create many `resources` (1:N).
- One `resource` can have many `comments` (1:N).
- One `user` can post many `comments` (1:N).

This schema supports user authentication, resource sharing with file uploads, and commenting, all integrated with the Node.js backend and React frontend.