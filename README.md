# Student Resource Sharing Platform

A full-stack web application for students to share academic resources (e.g., PDFs, notes) with features for uploading, searching, commenting, and user authentication. Built with Node.js/Express, Vite React, and MySQL, with planned deployment to AWS Elastic Beanstalk, S3, and RDS.

## Features
- **User Authentication**: Register and log in with JWT-based authentication (plain text passwords temporarily, pending secure hashing).
- **Resource Upload**: Upload resources with title, description, and file path (S3 integration planned).
- **Search**: Search resources by title or description with URL-persisted queries.
- **Navigation**: Responsive navbar with login/logout toggle.
- **Database**: MySQL with tables for Users, Resources, Subjects, Comments, and Resource-Subject relationships.
- **AWS-Ready**: Configured for Elastic Beanstalk, with S3 and RDS setup pending.

## Tech Stack
- **Backend**: Node.js, Express, MySQL (local), jsonwebtoken, cors
- **Frontend**: Vite, React, axios, react-router-dom
- **Database**: MySQL (local, RDS planned)
- **Deployment**: AWS Elastic Beanstalk, S3 (planned)
- **Environment**: Mac, VS Code, Homebrew

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL (installed via Homebrew)
- VS Code
- Git

### Installation
1. **Clone the Repository**:
   ```bash
   git clone git@github.com:your-username/student-resource-sharing-platform.git
   cd student-resource-sharing-platform
