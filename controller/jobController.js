const jobModel = require("../model/JobModal");
const mongoose = require("mongoose");

exports.createjobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Provide all field");
  }
  req.body.createdBy = req.user;
  const job = await jobModel.create(req.body);
  console.log(job);
  res.status(200).json({ job });
};

// GET JOBS-----------------------------------------------------------------

exports.getAllJobsController = async (req, res, next) => {
  const job = await jobModel.find({ createdBy: req.user });
  res.status(200).json({
    totalJobs: job.length,
    job,
  });
};

// UPDATE JOB ---------------------------------------------------------------

exports.updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //VALIDATION
  if (!company || !position) {
    next("please provide all fields");
  }
  // FIND JOB

  const job = await jobModel.findOne({ _id: id });
  if (!job) {
    next(`no job found with this id ${id}`);
  }

  if (!req.user === job.createdBy.toString()) {
    next(" you are not authrized to update this job ");
    return;
  }
  const updatejob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.send({ updatejob });
};

//          DELETE JOB BY ID ---------------------------------------------------------------
exports.deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  // find the job with the use of id
  console.log(id);
  const job = await jobModel.findById({ _id: id });
  if (!job) {
    next("No job found with this id ");
  }
  if (!req.user === job.createdBy.toString()) {
    next("You are not authorized to delete this job ");
    return;
  }
  await jobModel.deleteOne({ _id: id });
  res.status(200).json({
    message: "Success",
  });
};

// JOB STATS & FILTER ----------------------------------------------

exports.jobStatFilter = async (req, res, next) => {
  const stats = await jobModel.aggregate([
    // SEARCH BY USER_________________

    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json({
    TotalJob: stats.length, // GIVE TOTAL JOBS (IN NUMBERS)
    stats,
  });
};
