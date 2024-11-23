const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await User.findById({ _id: userId });

  const name = `${user.firstName}  ${user.lastName}`;
  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.emailAddress,
        id: user._id,
        name: name,
        role: "tourist",
      },
    },
    process.env.ACCESS_TOKEN_SECRET, // Signature
    { expiresIn: "5m" } // Expiry Duration
  );

  const refToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.emailAddress,
        id: user._id,
        role: "tourist",
      },
    },
    process.env.REFRESH_TOKEN_SECRET, // Signature
    { expiresIn: "1d" } // Expiry Duration
  );

  user.refreshToken = refToken;

  await user.save({ validateBefore: false });

  return { accessToken, refToken };
};

//@desc Get Tourist Email Address and Password for Verification
//@route Post /api/tourists
//@access public
const loginTourist = asyncHandler(async (req, res) => {
  if (req.user && req.user.role === "tourist") {
    res.status(200).json({
      message: "Already Logged In Before",
      email: req.user.email,
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    });
    return;
  }
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const user = await User.findOne({ emailAddress });
  if (!user) {
    res.status(404);
    throw new Error("Invalid Email-Address or Password");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      // Security options for making cookie data immutable
      httpOnly: true,
      secure: true,
    };

    console.log("User Logged In");

    const name = `${user.firstName}  ${user.lastName}`;
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refToken", refToken, options)
      .json({
        message: "Success",
        accessToken,
        refreshToken: refToken,
        id: user._id,
        name: name,
      });
  } else {
    res.status(404);
    throw new Error("Invalid Username or Password");
  }
});

//@desc Register a Tourist as User using email and password
//@route Post /api/tourists
//@access public
const registerTourist = asyncHandler(async (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  if (!firstName || !lastName || !emailAddress || !password) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const exUser = await User.findOne({ emailAddress });

  if (exUser) {
    res.status(400);
    throw new Error("Email Address Already Taken");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    emailAddress,
    password: hashPassword,
  });

  res
    .status(201)
    .json({
      message: "User created successfully",
      id: user._id,
      firstName,
      lastName,
      emailAddress,
    });
});

//@desc Refresh Access Token Using Refresh Token
//@route Post /api/tourist/refresh-token
//@access private
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const inRefreshToken = req.cookies?.refresh_token || req.body?.refreshToken;
    const user = await User.findById(req?.user.id);

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
});

//@desc GET LOGGED IN Tourist
//@route Post /api/tourists/current-tourist
//@access private
const currentTourist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    message: "Success",
    id: user._id,
    name: `${user.firstName}  ${user.lastName}`,
    email: user.emailAddress,
  });
});
module.exports = {
  loginTourist,
  registerTourist,
  refreshAccessToken,
  currentTourist,
  refreshAccessToken,
};
