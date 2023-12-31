const express = require("express");
const router = express.Router();

const {
  createjobController,
  getAllJobsController,
  updateJobController,
  deleteJobController,
  jobStatFilter,
} = require("../controller/jobController");
const userAuth = require("../middleware/authMiddleware");

router.post("/create-job", userAuth, createjobController); //CREATE JOB
router.get("/get-job", userAuth, getAllJobsController); // GET ALL JOBS
router.patch("/update-job/:id", userAuth, updateJobController); // UPDATE JOB BY ID
router.delete("/delete-job/:id", userAuth, deleteJobController); // DELETE JOB BY ID
router.get("/job-stats", userAuth, jobStatFilter); // JOB FILTER & STATS

module.exports = router;
