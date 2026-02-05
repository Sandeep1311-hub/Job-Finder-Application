const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, applyForJob);
router.get('/my-applications', protect, getMyApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);

router.route('/:id')
  .put(protect, authorize('employer', 'admin'), updateApplicationStatus)
  .delete(protect, deleteApplication);

module.exports = router;
