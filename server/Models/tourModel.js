const mongoose = require("mongoose");

// Sub schema
const daySchema = mongoose.Schema({
  dayNumber: Number,
  dayTitle: String,
  dayInformation: String,
});

// Actual schema
const tourSchema = mongoose.Schema(
  {
    tourAgencyId: mongoose.Schema.Types.ObjectId,
    tourAgencyName: String,
    tourLocationName: String,
    tourLocationImage: String,
    tourStartDate: Date,
    tourEndDate: Date,
    tourRegistrationEndDate: Date,
    tourInformation: String,
    tourStatus: {
      type: String,
      enum: ["Upcoming", "Registrations-Opened", "Active", "Completed", "Cancelled"],
    },
    tourPrice: String,
    tourPlan: [daySchema], // Sub schema
    tourLocationLink: String,
    tourMaxSlots: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);