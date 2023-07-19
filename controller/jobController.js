const jobModel = require("../model/JobModal");

exports.createjobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Provide all field");
  }

  req.body.createdBy = req.user;
  console.log(req.user);
  const job = await jobModel.create(req.body);
  console.log("kbioqvbf");
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
  // console.log(job.createdBy);
  if (req._id === job.createdBy.toString()) {
    return;
    next(" you are not authrized to update this job ");
  }
  const updatejob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updatejob });
};
