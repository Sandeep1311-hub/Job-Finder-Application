@echo off
echo ========================================
echo MERN Job Finder - Quick Start Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

echo ========================================
echo Setup complete!
echo ========================================
echo.
echo To start the application:
echo 1. Open Terminal 1: cd backend ^&^& npm run dev
echo 2. Open Terminal 2: cd frontend ^&^& npm start
echo.
echo Then visit: http://localhost:3000
echo.
echo Read README.md for detailed instructions
echo Read SETUP_GUIDE.md for step-by-step setup
echo.
pause
