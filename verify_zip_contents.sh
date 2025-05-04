#!/bin/bash

# Script to verify the contents of student-resource-platform.zip

# Define paths
ZIP_FILE="student-resource-platform.zip"
TEMP_DIR="temp_zip_extract"
ROOT_DIR="."

# List of files to check
FILES=(
    "frontend/.env"
    "frontend/src/components/UploadForm.jsx"
    "backend/src/routes/users.js"
    "package.json"
    "Procfile"
)

# Function to check if a file exists in the extracted directory
check_file_exists() {
    local file_path="$1"
    if [ -f "$TEMP_DIR/$file_path" ]; then
        echo "PASS: $file_path exists in the zip."
        return 0
    else
        echo "FAIL: $file_path is missing from the zip."
        return 1
    fi
}

# Function to check file contents
check_file_contents() {
    local file_path="$1"
    local expected_content="$2"
    if grep -q "$expected_content" "$TEMP_DIR/$file_path" 2>/dev/null; then
        echo "PASS: $file_path contains expected content: '$expected_content'."
        return 0
    else
        echo "FAIL: $file_path does NOT contain expected content: '$expected_content'."
        echo "Current content of $file_path:"
        cat "$TEMP_DIR/$file_path"
        return 1
    fi
}

# Main script
echo "Verifying contents of $ZIP_FILE..."

# Check if zip file exists
if [ ! -f "$ZIP_FILE" ]; then
    echo "ERROR: $ZIP_FILE does not exist in $ROOT_DIR."
    exit 1
fi

# Create temporary directory
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Unzip the file to temporary directory
unzip -q "$ZIP_FILE" -d "$TEMP_DIR"
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to unzip $ZIP_FILE."
    rm -rf "$TEMP_DIR"
    exit 1
fi

# Initialize error flag
ERRORS_FOUND=0

# Check each file and its contents
for file in "${FILES[@]}"; do
    check_file_exists "$file"
    if [ $? -ne 0 ]; then
        ERRORS_FOUND=1
    else
        # Define expected content for each file
        case "$file" in
            "frontend/.env")
                check_file_contents "$file" "VITE_API_URL=https://student-resource-env.eba-kui7mubp.us-east-2.elasticbeanstalk.com"
                if [ $? -ne 0 ]; then ERRORS_FOUND=1; fi
                ;;
            "frontend/src/components/UploadForm.jsx")
                check_file_contents "$file" "axios.post(\`\${import.meta.env.VITE_API_URL}/api/resources\`"
                if [ $? -ne 0 ]; then ERRORS_FOUND=1; fi
                ;;
            "backend/src/routes/users.js")
                check_file_contents "$file" "password_hash = password"
                if [ $? -ne 0 ]; then ERRORS_FOUND=1; fi
                ;;
            "package.json")
                check_file_contents "$file" "\"node\": \"18.20.2\""
                if [ $? -ne 0 ]; then ERRORS_FOUND=1; fi
                ;;
            "Procfile")
                check_file_contents "$file" "web: node backend/src/app.js"
                if [ $? -ne 0 ]; then ERRORS_FOUND=1; fi
                ;;
        esac
    fi
    echo "-------------------------"
done

# Check that .ebextensions, .elasticbeanstalk, and .env.aws do not exist
if [ -d "$TEMP_DIR/.ebextensions" ]; then
    echo "FAIL: .ebextensions directory exists in the zip. It should be removed."
    ERRORS_FOUND=1
else
    echo "PASS: .ebextensions directory does not exist in the zip."
fi
if [ -d "$TEMP_DIR/.elasticbeanstalk" ]; then
    echo "FAIL: .elasticbeanstalk directory exists in the zip. It should be removed."
    ERRORS_FOUND=1
else
    echo "PASS: .elasticbeanstalk directory does not exist in the zip."
fi
if [ -f "$TEMP_DIR/.env.aws" ]; then
    echo "FAIL: .env.aws file exists in the zip. It should be removed."
    ERRORS_FOUND=1
else
    echo "PASS: .env.aws file does not exist in the zip."
fi
echo "-------------------------"

# Clean up
rm -rf "$TEMP_DIR"

# Summary
if [ $ERRORS_FOUND -eq 0 ]; then
    echo "SUCCESS: All checks passed. The zip file is ready for deployment."
else
    echo "ERROR: One or more checks failed. Please fix the issues before redeploying."
    exit 1
fi

echo "Script completed."