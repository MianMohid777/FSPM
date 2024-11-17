const asyncHandler = require("express-async-handler");
const admin = require("../Models/admin-model");
const agencyReg = require("../Models/agency-RegModel");
const agency = require("../Models/agencyModel");
const jwt = require("jsonwebtoken");

// ACCESS TOKEN GENERATOR
const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await admin.findById({ _id: userId });

  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.email,
        id: user._id,
        role: "admin",
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "15m" } // Expiry Duration
  );

  const refToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.email,
        id: user._id,
        role: "admin",
      },
    },
    process.env.REFRESH_TOKEN_SECRET, // Signature
    { expiresIn: "1d" } // Expiry Duration
  );

  user.refreshToken = refToken;

  await user.save({ validateBefore: false });

  return { accessToken, refToken };
};

//@desc admin login & password
//@route /admin/login
//@access public

const loginAdmin = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === "admin") {
    res.status(200).json({
      message: "Already Logged In Before",
      email: req.user.email,
      id: req.user.id,
      role: req.user.role,
    });
    return;
  } else if (req.user && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Unauthorized User Access");
  }
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const adminUser = await admin.findOne({ email });

  if (!adminUser) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }

  const options = {
    // Security options for making cookie data immutable
    httpOnly: true,
    secure: true,
  };

  if (adminUser && password === adminUser.password) {
    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      adminUser._id
    );
    res
      .status(200)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refToken, options)
      .json({
        message: "Success",
        accessToken: accessToken,
        refreshToken: refToken,
      });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});

//@desc Current Admin
//@route /admin/current-admin
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === "admin") {
    res
      .status(200)
      .json({ message: "Admin Logged In", status: res.statusCode });
    return;
  }
  res.status(401).json({ message: "Unauthorized Access" });
});

//@desc Get All Non Active Applicants
//@route /admin/current-admin
//@access private

const getAllApplications = asyncHandler(async (req, res) => {
  const applications = await agencyReg.find({ status: "false" });
  try {
    if (applications.length > 0) {
      res.status(200).json(applications);
    } else {
      res.status(202).json({ message: "No applications found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("API Error");
  }
});

//@desc Update the status of the application to True
//@route /admin/current-admin/applications/:id
//@access private

const approveApplication = asyncHandler(async (req, res) => {
  try {
    const application = await agencyReg.findOneAndUpdate(
      { _id: req.params.id },
      { status: true },
      { new: true }
    );

    if (!application) {
      res.status(404);
      throw new Error("Application Not Found");
    }

    res.status(200).json({ message: "success", application });
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Application Not Found");
  }
});

//@desc Update the status of the application to True
//@route /admin/current-admin/applications/approve:id
//@access private

const deleteApplication = asyncHandler(async (req, res) => {
  try {
    const application = await agencyReg.findById({ _id: req.params.id });

    if (!application) {
      res.status(404);
      throw new Error("Application Not Found");
    }

    if (application) {
      await agencyReg.deleteOne({ _id: req.params.id });
      res
        .status(200)
        .json({ message: "Application Deleted Successfully", application });
    }
  } catch (err) {
    console.log(err);
    res.status(404);
    throw new Error("Application Not Found");
  }
});
//@desc Log Out the Admin
//@route /admin/current-admin/logout
//@access private

const logOut = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  if (req.user) req.user = {};
  res
    .status(200)
    .clearCookie("access_token", options)
    .clearCookie("refresh_token", options)
    .json({ message: "Logged Out" });
});

//@desc Create Initial Profile for Approved Agency
//@route Post /api/admin/applications/init-profile:id
//@access private
const createProfile = asyncHandler(async (req, res) => {
  const { companyName, description } = req.body;

  if (!companyName || !description) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const exAgency = await agencyReg.findOne({ _id: req.params.id });

  if (!exAgency) {
    res.status(400);
    throw new Error("Agency Not Found");
  }
  const company = await agency.findOne({ agencyId: req.params.id });

  if (company) {
    res.status(400);
    throw new Error("Profile Already Created");
  }

  const profile = await agency.create({
    name: companyName,
    description,
    agencyId: req.params.id,
  });

  res.status(201).json({
    message: "Profile Created Successfully",
    profile,
  });
});

//@desc Refresh Access Token Using Refresh Token
//@route Post /api/admin/refresh-token
//@access private
const refreshAccessToken = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === "admin") {
    try {
      const inRefreshToken =
        req.cookies?.refresh_token || req.body?.refreshToken;
      const user = await admin.findById(req?.user.id);

      if (!user) {
        res.status(401);
        throw new Error("Invalid Refresh Token");
      }
      if (inRefreshToken !== user?.refreshToken) {
        res.status(401);
        throw new Error("Refresh Token Expired or Used");
      }

      const options = {
        httpOnly: true,
        secure: true,
      };

      const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
        user._id
      );

      res
        .status(200)
        .cookie("access_token", accessToken, options)
        .cookie("refresh_token", refToken, options)
        .json({
          message: "Access Token Refreshed",
          accessToken,
          refreshToken: refToken,
        });
    } catch (err) {
      console.log(err);
      res.status(401).json({ message: err.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }
});
module.exports = {
  loginAdmin,
  currentAdmin,
  getAllApplications,
  approveApplication,
  logOut,
  deleteApplication,
  refreshAccessToken,
  createProfile,
};
