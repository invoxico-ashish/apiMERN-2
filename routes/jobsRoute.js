const express = require("express");
const router = express.Router();

const {
  createjobController,
  getAllJobsController,
  updateJobController,
} = require("../controller/jobController");
const userAuth = require("../middleware/authMiddleware");

router.post("/create-job", userAuth, createjobController); //CREATE JOB
router.get("/get-job", userAuth, getAllJobsController); // GET ALL JOBS
router.patch("/update-job/:id", userAuth, updateJobController); // GET ALL JOBS

module.exports = router;
