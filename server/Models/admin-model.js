const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Provide email"], // if no email then whats the point 
  },
  password: {
    type: String,
    required: [true, "Provide Password"], // thanks beyonce 
  },
  refreshToken: {
    type: String, // why string coz why not
  },
});
module.exports = mongoose.model("Admin", adminSchema);