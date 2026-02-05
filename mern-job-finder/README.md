# 💼 MERN Stack Job Finder Application

A full-featured job finding platform built with MongoDB, Express.js, React, and Node.js.

## 🚀 Features

### User Features
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Role-based Access**: Three user roles (Job Seeker, Employer, Admin)
- **Job Search & Filtering**: Advanced search with multiple filters
- **Job Applications**: Apply for jobs with resume and cover letter
- **Profile Management**: Update personal information, skills, and experience
- **Application Tracking**: Monitor status of all submitted applications

### Employer Features
- **Post Jobs**: Create detailed job postings
- **Manage Listings**: Edit and delete job postings
- **View Applications**: Review all applications for posted jobs
- **Update Status**: Change application status (pending, reviewing, shortlisted, rejected, accepted)

## 📋 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling
- **Validator** - Data validation

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Context API** - State management
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **CSS3** - Styling

## 📁 Project Structure

```
mern-job-finder/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Job.js                # Job schema
│   │   └── Application.js        # Application schema
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── jobController.js      # Job CRUD operations
│   │   └── applicationController.js  # Application logic
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── jobs.js               # Job routes
│   │   └── applications.js       # Application routes
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── error.js              # Error handling
│   ├── .env                      # Environment variables
│   ├── server.js                 # Entry point
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation bar
    │   │   ├── JobCard.js        # Job display card
    │   │   └── PrivateRoute.js   # Route protection
    │   ├── pages/
    │   │   ├── Home.js           # Landing page
    │   │   ├── Login.js          # Login page
    │   │   ├── Register.js       # Registration page
    │   │   ├── Jobs.js           # Job browsing
    │   │   ├── JobDetails.js     # Single job view
    │   │   ├── CreateJob.js      # Job posting
    │   │   ├── Profile.js        # User profile
    │   │   └── MyApplications.js # Applications view
    │   ├── context/
    │   │   ├── AuthContext.js    # Auth state
    │   │   └── JobContext.js     # Job state
    │   ├── App.js                # Main component
    │   ├── index.js              # Entry point
    │   └── package.json
    └── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone or Extract the Project
```bash
cd mern-job-finder
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

**Configure Environment Variables:**
Edit the `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-finder
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

### Step 4: Database Setup
**Start MongoDB:**
```bash
# Windows (if installed as service)
net start MongoDB

# MacOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Or run directly
mongod
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
App runs on: http://localhost:3000

## 📱 Usage Guide

### For Job Seekers:
1. **Register** as a User
2. **Complete your profile** with skills and experience
3. **Browse jobs** using filters
4. **Apply for jobs** with resume and cover letter
5. **Track applications** in My Applications

### For Employers:
1. **Register** as an Employer
2. **Post new jobs** with detailed requirements
3. **Manage job listings**
4. **Review applications**
5. **Update application status**

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Jobs
- `GET /api/jobs` - Get all jobs (Public)
- `GET /api/jobs/:id` - Get single job (Public)
- `POST /api/jobs` - Create job (Employer/Admin)
- `PUT /api/jobs/:id` - Update job (Employer/Admin)
- `DELETE /api/jobs/:id` - Delete job (Employer/Admin)
- `GET /api/jobs/my-jobs` - Get posted jobs (Employer/Admin)

### Applications
- `POST /api/applications` - Apply for job (User)
- `GET /api/applications/my-applications` - Get user applications (User)
- `GET /api/applications/job/:jobId` - Get job applications (Employer/Admin)
- `PUT /api/applications/:id` - Update application status (Employer/Admin)
- `DELETE /api/applications/:id` - Delete application (User/Admin)

## 🎨 Key MERN Concepts Demonstrated

### MongoDB & Mongoose
- Schema design with relationships
- Data validation
- Indexing for search optimization
- Password hashing with pre-save hooks
- Compound indexes

### Express.js
- RESTful API architecture
- Middleware implementation
- Error handling
- CORS configuration
- Route protection

### React
- Functional components
- React Hooks (useState, useEffect, useContext)
- Context API for state management
- React Router for navigation
- Protected routes
- Form handling

### Node.js
- Environment variables
- JWT token generation
- Async/await patterns
- File structure organization

## 🔐 Security Features
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Role-based access control
- Input validation
- CORS protection

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Create account on platform
2. Create new app
3. Connect repository
4. Add environment variables
5. Deploy

### Frontend (Vercel/Netlify)
1. Run `npm run build` in frontend
2. Create account on platform
3. Connect repository or upload build folder
4. Deploy

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in .env

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB is installed

**Port Already in Use:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

**CORS Errors:**
- Verify frontend proxy in package.json
- Check backend CORS configuration

## 📝 License
MIT License

## 👨‍💻 Author
MERN Stack Developer

## 🙏 Acknowledgments
- MongoDB Documentation
- Express.js Documentation
- React Documentation
- Node.js Documentation

---

**Happy Coding! 🚀**
