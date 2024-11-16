const mongoose = require("mongoose");

// Sub schema
const daySchema = mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  dayTitle: {
    type: String,
    required: true,
  },
  dayInformation: {
    type: String,
    required: true,
  },
});

//Actual schema
const tourSchema = mongoose.Schema(
  {
    tourAgencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Unable to find Agency ID"],
    },
    tourAgencyName: {
      type: String,
      required: [true, "Provide Company Name"],
    },
    tourLocationName: {
      type: String,
      required: [true, "Provide Location Name"],
    },
    tourLocationImage: {
      type: String,
      required: [true, "Provide Location Image URL"],
    },
    tourStartDate: {
      type: Date,
      default: new Date("2024-06-01T00:00:00.000Z"),
      required: [true, "Provide Start Date"],
    },
    tourEndDate: {
      type: Date,
      default: new Date(),
      required: [true, "Provide End Date"],
    },
    tourRegistrationEndDate: {
      type: Date,
      default: "2024-06-30T23:59:59.999Z",
      required: [true, "Provide Registration End Date"],
    },
    tourInformation: {
      type: String,
      required: [true, "Provide Information"],
    },
    tourStatus: {
      type: String,
      enum: [
        "Upcoming",
        "Registrations-Opened",
        "Active",
        "Completed",
        "Cancelled",
      ],
      required: [true, "Provide Status"],
    },
    tourPrice: {
      type: String,
      required: [true, "Provide Price"],
    },
    tourPlan: [daySchema], // Sub schema
    tourLocationLink: {
      type: String,
      required: [true, "Provide Location Link"],
    },
    tourMaxSlots: {
      type: Number,
      required: [true, "Provide Max Slots"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
