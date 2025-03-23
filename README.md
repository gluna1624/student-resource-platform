markdown

# Student Resource Sharing Platform

Welcome to the **Student Resource Sharing Platform**, a full-stack web app built from the ground up for CS-691 at LIU Spring 2025. This project, living on the `gluna1624` branch, lets students share and explore academic resources with a flashy, modern twist—think resource lists, details, uploads, and search, all wrapped in a vibrant UI. Here’s the journey of how it came to life!

## Project Overview

- **Goal**: Create a local web app where students can view, upload, and search study resources (e.g., notes, guides).  
- **Tech Stack**:  
  - **Frontend**: React (Vite) for a dynamic, animated UI.  
  - **Backend**: Node.js with Express for API magic.  
  - **Database**: MySQL for storing resources.  
- **Features**: Resource listing, detail views, text-based uploads, and a snappy search bar.

## How It Was Built

### Setup (Week 1 Vibes)

Started on a fresh MacBook Air M4 (16 GB RAM, 256 GB SSD) on March 22, 2025: Installed tools with Homebrew: `brew install node mysql git`. Set up VS Code for editing. Created the project folder: `~/Desktop/student-resource-platform` with `client` (frontend) and `server` (backend) subfolders.

### Backend (Node.js + MySQL)

Initialized Node.js: `npm init -y` and installed `express`, `mysql2`, `cors`. Wrote `server/index.js` with endpoints: `GET /resources`: Lists all resources. `GET /resources/:id`: Shows one resource. `POST /resources`: Adds a new resource. `GET /resources/search?q=query`: Searches titles/descriptions. Connected to MySQL (`student_platform` database, `root` user, `root123` password) with a `resources` table (`id`, `title`, `description`). Ran into port 5000 conflicts (macOS Control Center), switched to 5001.

### Frontend (React with Vite)

Set up React: `npm create vite@latest . -- --template react` in `client`, added `axios` and `react-router-dom`. Built components in `client/src/components/`: `Navbar.jsx`: A gradient header with “StudyHub” branding. `ResourceList.jsx`: Animated resource cards that bounce in. `ResourceDetail.jsx`: Sleek detail view. `ResourceUpload.jsx`: Flashy upload form. `SearchBar.jsx`: Quick search with bold styling. Routed it all in `App.jsx` with `react-router-dom`.

### Styling for Wow Factor

Added `styles.css` with gradients, shadows, and animations (e.g., `bounceIn` for cards). Imported Poppins font via `main.jsx` for a pro look. Tweaked colors (reds, oranges) and hover effects to ditch the “newbie” vibe.

### GitHub Push

Installed Git: `brew install git`. Initialized repo: `git init`, committed files: `git add . && git commit -m "Initial commit"`. Set SSH with a new key (`SHA256:UkOuQnKc...`), added to GitHub as “MacBook M4 2025”. Force-pushed to `gluna1624` branch: `git push origin HEAD:gluna1624 --force`.

## Running It Locally

1. **Clone the Repo**:  
   ```bash  
   git clone -b gluna1624 https://github.com/LIUSpring2025/CS-691.git  
   cd CS-691  

Backend Setup:  
bash

cd server  
npm install  
brew services start mysql  
mysql -u root -p  # Use 'root123', create 'student_platform' DB and 'resources' table  
node index.js  

Frontend Setup:  
bash

cd ../client  
npm install  
npm run dev  

Open http://localhost:5173—boom, it’s live!

Challenges Overcome
Silent Node.js crashes (missing app.listen).  

MySQL ECONNREFUSED (forgot to restart after shutdown).  

GitHub auth woes (switched from HTTPS to SSH).

What’s Here
A local app with a pro-grade UI, resource sharing, and search—ready to impress! Check gluna1624 branch for the latest.
Author: Gregory Luna (gluna1624, gregory.luna@my.liu.edu)

# Student Resource Sharing Platform

## Overview
This is a web application built for students to share and access study resources. It features a flashy UI with a React frontend, a Node.js/Express backend, and a MySQL database. Users can list resources, view details, upload new resources, and search for them. Recently, a login system was added to secure uploads and personalize the experience.

## Features
- **Resource Listing**: Displays all resources as animated cards with a bounce-in effect.
- **Resource Details**: Shows detailed info for each resource.
- **Upload**: Allows logged-in users to add new resources (title and description).
- **Search**: Filters resources by title or description (e.g., "math" finds "Math Notes").
- **Login System**: Users can register and log in; navbar toggles between "Login" and "Logout" based on auth status.
- **Styling**: Gradient navbar, Poppins font, card shadows, and hover effects.

## Tech Stack
- **Frontend**: React (Vite), axios, react-router-dom, CSS (gradients, animations).
- **Backend**: Node.js, Express, MySQL (mysql2), bcryptjs (password hashing), jsonwebtoken (JWT auth).
- **Database**: MySQL with tables `resources` (id, title, description) and `users` (id, username, password).
- **Tools**: Homebrew, Git, VS Code.

## Setup Instructions
1. **Environment**:
   - Install Node.js, MySQL, Git via Homebrew: `brew install node mysql git`.
   - Set up project folder: `~/Desktop/student-resource-platform` with `client` and `server` subfolders.
2. **Backend**:
   - `cd server`, run `npm init -y`, then `npm install express mysql2 cors bcryptjs jsonwebtoken`.
   - Start MySQL: `brew services start mysql`.
   - Create database: `mysql -u root -p`, then `CREATE DATABASE student_platform;`.
   - Create tables:
     ```sql
     USE student_platform;
     CREATE TABLE resources (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT);
     CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50), password VARCHAR(255));
     ```
   - Run: `node index.js`.
3. **Frontend**:
   - `cd client`, run `npm create vite@latest . -- --template react`, then `npm install axios react-router-dom`.
   - Run: `npm run dev`.
4. **Git**:
   - Initialize: `git init`, add files: `git add .`, commit: `git commit -m "Initial commit with login"`.
   - Push: `git push origin HEAD:gluna1624 --force` (assuming branch `gluna1624`).

## Progress
- **Done**: Full local app (list, details, upload, search), login/register system, navbar auth toggle, GitHub sync (mostly).
- **Next**: Push updated README, test login fully, consider admin section or comments.

## Troubleshooting
- MySQL errors: Ensure `brew services start mysql` and correct credentials.
- Port conflicts: Backend uses 5001 (changed from 5000).
- Search blank: Verify database is running and populated.

