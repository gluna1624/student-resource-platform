#!/bin/bash

# Script to display contents of specified project files

# Define root directory (assumes script is run from project root)
ROOT_DIR="."

# List of files to display
FILES=(
    # Frontend files
    "frontend/src/App.jsx"
    "frontend/src/components/NavBar.jsx"
    "frontend/src/components/NavBar.css"
    "frontend/src/components/UploadForm.jsx"
    "frontend/.env"
    "frontend/vite.config.js"

    # Backend files
    "backend/src/app.js"
    "backend/src/routes/users.js"
    "backend/src/config/db.js"
    "backend/src/config/s3.js"

    # AWS configuration files
    ".ebextensions/01_environment.config"
    ".ebextensions/02_nodejs.config"
    ".ebextensions/03_iam.config"
    ".ebextensions/04_security_group.config"
    "Procfile"
    ".elasticbeanstalk/config.yml"

    # Root environment files
    ".env.local"
    ".env.aws"
)

# Function to display file contents
display_file() {
    local file_path="$1"
    if [ -f "$file_path" ]; then
        echo "===== Contents of $file_path ====="
        cat "$file_path"
        echo -e "\n============================\n"
    else
        echo "File $file_path not found."
        echo -e "============================\n"
    fi
}

# Loop through and display each file
for file in "${FILES[@]}"; do
    display_file "$ROOT_DIR/$file"
done

echo "Script completed."