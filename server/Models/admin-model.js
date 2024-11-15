const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Provide email"],
  },
  password: {
    type: String,
    required: [true, "Provide Password"],
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", adminSchema);