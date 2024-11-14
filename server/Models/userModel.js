const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Provide First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Provide Last Name"],
    },
    emailAddress: {
      type: String,
      required: [true, "Provide email"],
      unique: [true, "Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Provide Password"],
    },
    refreshToken: {
      type: String,
    },
    accountType: {
      type: String,
    },
    displayPic: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
