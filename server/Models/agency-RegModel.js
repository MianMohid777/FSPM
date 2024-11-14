const mongoose = require("mongoose");

const agencyRegSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, "Provide Admin Name"],
    },
    companyName: {
      type: String,
      required: [true, "Provide Company Name"],
    },
    adminCNIC: {
      type: String,
      required: [true, "Provide Admin CNIC"],
      unique: [true, "Already Taken"],
    },
    companyEmail: {
      type: String,
      required: [true, "Provide Company Email"],
      unique: [true, "Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    companyNTN: {
      type: String,
      required: [true, "Provide Company NTN"],
      unique: [true, "Already Exists"],
    },
    contactNo: {
      type: String,
      required: [true, "Provide Contact Number"],
    },
    officeAddress: {
      type: String,
      required: [true, "Provide Office Address"],
      unique: [true, "Already Exists"],
    },
    city: {
      type: String,
      required: [true, "Provide City"],
    },
    province: {
      type: String,
      required: [true, "Provide Province"],
    },
    license: {
      type: String,
      required: [true, "Provide License"],
      unique: [true, "Already Exists"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgencyReg", agencyRegSchema);
