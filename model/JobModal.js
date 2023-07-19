const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is require"],
    },
    position: {
      type: String,
      required: [true, "job position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Reject", "Interview"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    Workloc: {
      type: String,
      default:"Mohali",
      required:[true, "required"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
