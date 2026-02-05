const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, jobType, category, experienceLevel, minSalary, maxSalary } = req.query;

    const queryObject = { status: 'active' };

    // Search by keyword (title, description, company)
    if (keyword) {
      queryObject.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } }
      ];
    }

    // Filter by location
    if (location) {
      queryObject.location = { $regex: location, $options: 'i' };
    }

    // Filter by job type
    if (jobType) {
      queryObject.jobType = jobType;
    }

    // Filter by category
    if (category) {
      queryObject.category = category;
    }

    // Filter by experience level
    if (experienceLevel) {
      queryObject.experienceLevel = experienceLevel;
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      queryObject.salary = {};
      if (minSalary) {
        queryObject['salary.min'] = { $gte: Number(minSalary) };
      }
      if (maxSalary) {
        queryObject['salary.max'] = { $lte: Number(maxSalary) };
      }
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject)
      .populate('postedBy', 'name email company')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments(queryObject);

    res.json({
      jobs,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email phone location')
      .populate({
        path: 'applications',
        populate: { path: 'applicant', select: 'name email' }
      });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer/Admin)
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer/Admin)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();

    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my posted jobs
// @route   GET /api/jobs/my-jobs
// @access  Private (Employer/Admin)
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate('applications')
      .sort('-createdAt');

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
