const jobModel = require("../model/JobModal");

exports.createjobController = async (req, res, next) => {
  const { company, position } = req.body;
  // console.log(req.body);
  if (!company || !position) {
    next("Provide all field");
  }
  req.body.createdBy = req._id;
  const job = await jobModel.create(req.body);
  res.status(200).json({ job });
};

// GET JOBS

exports.getAllJobsController = async (req, res) => {
  console.log(req._id);
  const job = await jobModel.find({ createdBy: req._id });
  res.status(200).json({
    totalJobs: job.length,
    job,
  });
};
