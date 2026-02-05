# 📘 Complete Setup Guide - MERN Job Finder

This guide will walk you through setting up and running the MERN Job Finder application on your local machine.

## 📦 What You'll Need

### Required Software
1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (v4.4 or higher)
   - Download: https://www.mongodb.com/try/download/community
   - Verify installation: `mongod --version`

3. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

4. **Code Editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

## 🚀 Step-by-Step Setup

### Step 1: Extract the Project
1. Extract the `mern-job-finder` folder to your desired location
2. Open terminal/command prompt
3. Navigate to the project:
   ```bash
   cd path/to/mern-job-finder
   ```

### Step 2: Install MongoDB (if not installed)

**Windows:**
1. Download MongoDB Community Server
2. Run installer (choose "Complete" installation)
3. Install MongoDB as a Windows Service
4. Default data directory: `C:\data\db`

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 3: Verify MongoDB is Running
```bash
# Check if MongoDB is running
mongosh  # or mongo (older versions)

# You should see MongoDB shell
# Exit with: exit
```

### Step 4: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages (may take 2-3 minutes)

3. **Configure environment variables:**
   The `.env` file is already created. Review and update if needed:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-finder
   JWT_SECRET=your_super_secret_jwt_key_change_this
   NODE_ENV=development
   ```

4. **Test the backend:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Server running in development mode on port 5000
   MongoDB Connected: localhost
   ```

   **If you see errors:**
   - **MongoDB not connected**: Make sure MongoDB is running
   - **Port in use**: Change PORT in .env to 5001
   - **Module not found**: Run `npm install` again

### Step 5: Frontend Setup

1. **Open a NEW terminal** (keep backend running)

2. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install React and all dependencies (may take 3-5 minutes)

4. **Start the React app:**
   ```bash
   npm start
   ```

   The app will automatically open in your browser at http://localhost:3000

   **If you see errors:**
   - **Port in use**: The app will ask to use port 3001, press 'Y'
   - **Dependencies error**: Delete `node_modules` and run `npm install` again

## ✅ Verification

### 1. Check Backend API
Open browser and visit: http://localhost:5000/api/health

You should see:
```json
{"message":"Server is running!"}
```

### 2. Check Frontend
Visit: http://localhost:3000

You should see the Job Finder home page

## 🎯 First Time Usage

### Create Your First User

1. **Click "Register"** on the navbar
2. **Fill in the form:**
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
   - Role: Job Seeker or Employer
3. **Click "Register"**
4. You'll be redirected to the Jobs page

### Post Your First Job (as Employer)

1. **Register as Employer**
2. **Click "Post Job"** in navbar
3. **Fill in job details:**
   - Title: Senior React Developer
   - Company: Tech Corp
   - Description: We are looking for...
   - Location: San Francisco, CA
   - Job Type: Full-time
   - Salary: Min 80000, Max 120000
   - Category: Technology
   - Experience: Mid
   - Skills: React, Node.js, MongoDB
4. **Click "Post Job"**
5. Job will appear in Browse Jobs

### Apply for a Job (as User)

1. **Register as User**
2. **Go to "Jobs"** in navbar
3. **Click on any job** → "View Details"
4. **Click "Apply for this Job"**
5. **Fill application:**
   - Resume URL: https://yourresume.com/resume.pdf
   - Cover Letter: Brief introduction
6. **Click "Submit Application"**
7. **View in "My Applications"**

## 🔄 Daily Development Workflow

### Starting the App
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Stopping the App
- Press `Ctrl + C` in both terminals
- (Optional) Stop MongoDB if not needed:
  ```bash
  # Windows
  net stop MongoDB
  
  # macOS
  brew services stop mongodb-community
  
  # Linux
  sudo systemctl stop mongod
  ```

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running, start it
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue 2: "Port 5000 already in use"
**Solution:**
```bash
# Find and kill process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
PORT=5001
```

### Issue 3: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: "CORS error"
**Solution:**
- Check `frontend/package.json` has: `"proxy": "http://localhost:5000"`
- Restart both servers

### Issue 5: "React not updating"
**Solution:**
```bash
# Clear cache
npm start -- --reset-cache
```

## 📊 Database Management

### View Database in MongoDB Compass
1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect to: `mongodb://localhost:27017`
3. View database: `job-finder`
4. Collections: `users`, `jobs`, `applications`

### Reset Database
```bash
mongosh
use job-finder
db.dropDatabase()
exit
```

### Backup Database
```bash
mongodump --db job-finder --out ./backup
```

### Restore Database
```bash
mongorestore --db job-finder ./backup/job-finder
```

## 🎨 Customization

### Change Colors
Edit `frontend/src/App.css` - modify gradient colors

### Add New Job Categories
Edit `backend/models/Job.js` - update category enum

### Modify Email Validation
Edit `backend/models/User.js` - update validator

## 📱 Testing the Application

### Test User Accounts
Create these for testing:
1. **Job Seeker**: user@test.com / password123
2. **Employer**: employer@test.com / password123
3. **Admin**: admin@test.com / password123

### Sample Data
- Create 5-10 jobs as employer
- Apply to jobs as user
- Test all features

## 🚀 Next Steps

1. **Explore all features**
2. **Customize the design**
3. **Add new features**
4. **Deploy to production**

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review error messages
3. Check MongoDB is running
4. Verify all dependencies installed
5. Check both servers are running

## ✨ Congratulations!

You now have a fully functional MERN stack job finder application running locally!

Start building and customizing your app! 🎉
