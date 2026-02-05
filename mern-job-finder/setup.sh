#!/bin/bash

echo "🚀 MERN Job Finder - Quick Start Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo ""
    echo "Start MongoDB with one of these commands:"
    echo "  Windows: net start MongoDB"
    echo "  macOS:   brew services start mongodb-community"
    echo "  Linux:   sudo systemctl start mongod"
    echo "  Or run:  mongod"
    echo ""
    read -p "Press Enter once MongoDB is running..."
fi

echo "✅ MongoDB is running"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"
echo ""

echo "✨ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Terminal 1: cd backend && npm run dev"
echo "2. Terminal 2: cd frontend && npm start"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "📖 Read README.md for detailed instructions"
echo "📘 Read SETUP_GUIDE.md for step-by-step setup"
