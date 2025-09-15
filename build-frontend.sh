#!/bin/bash

# Build script for frontend before Beanstalk deployment

echo "🔨 Building frontend for production..."

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Build the frontend
echo "🏗️ Building React app..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Frontend build successful!"
    echo "📁 Built files are in frontend/dist/"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Go back to root directory
cd ..

echo "🎉 Frontend is ready for deployment!"
