const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'admin'), createJob);

router.get('/my-jobs', protect, authorize('employer', 'admin'), getMyJobs);

router.route('/:id')
  .get(getJobById)
  .put(protect, authorize('employer', 'admin'), updateJob)
  .delete(protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;
