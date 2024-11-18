const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// ACCESS TOKEN GENERATOR
const generateAccess_and_Refresh_Token = async (userId) => {
  const user = await User.findById({ _id: userId });

  const accessToken = jwt.sign(
    {
      //Payload //
      user: {
        email: user.emailAddress,
        id: user._id,
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
        email: user.email,
        id: user._id,
      },
    },
    process.env.REFRESH_TOKEN_SECRET, // Signature
    { expiresIn: "1d" } // Expiry Duration
  );

  user.refreshToken = refToken;

  await user.save({ validateBefore: false });

  return { accessToken, refToken };
};

// Get Users List
const oathLogin = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectURL = "http://127.0.0.1:3002/api/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  // Generate the url that will be used for the consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

// GET USER DATA FROM GOOGLE
const getUserData = asyncHandler(async (access_token) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  //console.log("response", response);
  const data = await response.json();
  //console.log("data", data);
});

//GET HOME PAGE
const getOauth = asyncHandler(async function (req, res, next) {
  const code = req.query.code;

  //console.log(code);
  try {
    const redirectURL = "http://127.0.0.1:3002/api/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const resp = await oAuth2Client.getToken(code);

    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(resp.tokens);
    console.info("Tokens acquired.");

    const user = oAuth2Client.credentials;
    //console.log("credentials", user);

    await getUserData(oAuth2Client.credentials.access_token);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: user.id_token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    //console.log(payload);

    const exUser = await User.findOne({ emailAddress: payload.email });

    console.log(exUser);
    let newUser = "";

    if (exUser === null) {
      console.log("First Time Sign In using Google");
      newUser = await User.create({
        firstName: payload.given_name,
        lastName: payload.family_name,
        emailAddress: payload.email,
        password: payload.sub,
        accountType: "GSI",
        displayPic: payload.picture,
      });

      if (newUser) console.log(newUser);
    }

    const { accessToken, refToken } = await generateAccess_and_Refresh_Token(
      exUser ? exUser._id : newUser._id
    );

    res.redirect(
      303,
      `http://localhost:3000/tourist-login?message=success&accessToken=${accessToken}&refreshToken=${refToken}`
    );
  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }
});
module.exports = { oathLogin, getOauth };
