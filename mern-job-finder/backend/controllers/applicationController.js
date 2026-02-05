const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (User)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resume,
      coverLetter
    });

    // Add application to job
    job.applications.push(application._id);
    await job.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get my applications
// @route   GET /api/applications/my-applications
// @access  Private (User)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location jobType salary')
      .sort('-appliedAt');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer/Admin)
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is job owner or admin
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone location skills experience')
      .sort('-appliedAt');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Employer/Admin)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is job owner or admin
    if (application.job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = req.body.status || application.status;
    application.notes = req.body.notes || application.notes;

    const updatedApplication = await application.save();

    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private (User/Admin)
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is application owner or admin
    if (application.applicant.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await application.deleteOne();

    res.json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
