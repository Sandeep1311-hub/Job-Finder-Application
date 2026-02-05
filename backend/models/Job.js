const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide job description'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    required: [true, 'Please provide job location'],
    trim: true
  },
  jobType: {
    type: String,
    required: [true, 'Please specify job type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote']
  },
  salary: {
    min: {
      type: Number,
      required: [true, 'Please provide minimum salary']
    },
    max: {
      type: Number,
      required: [true, 'Please provide maximum salary']
    }
  },
  category: {
    type: String,
    required: [true, 'Please specify job category'],
    enum: ['Technology', 'Marketing', 'Sales', 'Design', 'Finance', 'Healthcare', 'Education', 'Other']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Please specify experience level'],
    enum: ['Entry', 'Mid', 'Senior', 'Lead']
  },
  skills: [{
    type: String,
    trim: true
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  deadline: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

module.exports = mongoose.model('Job', jobSchema);
