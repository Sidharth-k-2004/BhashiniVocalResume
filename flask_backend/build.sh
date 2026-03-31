#!/usr/bin/env bash
# exit on error
set -o errexit

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir -p /tmp/uploads

# Initialize database
python init_db.py

