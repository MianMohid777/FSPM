const Tour = require("../Models/tourModel");
const asyncHandler = require("express-async-handler");

const allTours = asyncHandler(async (req, res) => {
  const allTours = await Tour.find();
  res.status(200).json({
    tours: allTours,
  });
});

const tourByID = asyncHandler(async (req, res) => {
    const tourId = req.params.id; // Access the tour ID from route parameters
    const tour = await Tour.findById(tourId); // Use the retrieved tour ID to find the tour
    if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
    }
    res.status(200).json({
        tour: tour, // Return the tour object
    });
});

module.exports = {
  allTours,
  tourByID
};
