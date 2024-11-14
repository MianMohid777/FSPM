const mongoose = require("mongoose");

const agencySchema = mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agencyReg",
    },
    name: {
      type: String,
      required: [true, "Provide Agency Name"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Provide Phone Number"],
    },
    description: {
      type: String,
      required: [true, "Provide Agency Description"],
    },
    profilePicture: {
      type: String,
    },
    gallery: [String],
    socialMediaLinks: {
      faceBook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
    },
    website: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("agency", agencySchema);
