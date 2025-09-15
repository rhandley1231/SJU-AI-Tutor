#!/bin/bash

# Elastic Beanstalk Deployment Script for SJU AI Tutor

echo "🚀 Deploying SJU AI Tutor to Elastic Beanstalk..."

# Build frontend first
echo "🔨 Building frontend..."
./build-frontend.sh

# Check if frontend build was successful
if [ ! -d "frontend/dist" ]; then
    echo "❌ Frontend build failed. Cannot deploy."
    exit 1
fi

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI not found. Installing..."
    pip install awsebcli
fi

# Initialize EB if not already done
if [ ! -f ".elasticbeanstalk/config.yml" ]; then
    echo "📝 Initializing Elastic Beanstalk..."
    eb init --platform python-3.11 --region us-east-2
fi

# Create environment if it doesn't exist
echo "🌱 Creating/updating environment..."
eb deploy

echo "✅ Deployment complete!"
echo "🔗 Your application should be available at the URL shown above."
