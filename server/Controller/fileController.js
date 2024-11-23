const fs = require("fs");
const path = require("path");

const getImage = (req, res) => {
  const dir = path.resolve(__dirname, "..");
  const staticPath = path.join("Static", req.params.filename);
  const imagePath = path.join(dir, staticPath);
  console.log(imagePath);

  const image = fs.readFileSync(imagePath);
  //console.log(dir);
  res.send(image);
};

const uploadImage = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  res.status(200).json({
    message: "Image Uploaded Successfully",
    filePath: req.file.path,
  });
};

const uploadGallery = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  if (!req.files) {
    res.status(400);
    throw new Error("No file uploaded");
  }
  const filePaths = req.files.map((file) => file.path);

  res.status(200).json({
    message: "Image Uploaded Successfully",
    filePath: filePaths,
  });
};

const getImageSubString = (req, res) => {
  const dir = path.resolve(__dirname, "..");
  const staticPath = "Static"; // Assuming images are stored in a 'Static' folder
  const searchString = req.query.searchString || ''; // Extract search string from query params
  const searchRegex = new RegExp(searchString.replace(/\s+/g, '-'), 'i'); // Create case-insensitive regex

  // Read the directory to get the list of image files
  fs.readdir(path.join(dir, staticPath), (err, files) => {
      if (err) {
          console.error('Error reading image directory:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
      }

      // Filter images based on the search criteria
      const matchingImages = files.filter(file => searchRegex.test(file));

      // If no matching images found, return 404
      if (matchingImages.length === 0) {
          res.status(404).json({ error: 'No matching images found' });
          return;
      }

      // Assuming you want to send only the first matching image
      const imagePath = path.join(dir, staticPath, matchingImages[0]);
      console.log('Sending image:', imagePath);
      
      // Send the image file as response
      res.sendFile(imagePath);
  });
};

module.exports = { getImage, uploadImage, uploadGallery, getImageSubString };
