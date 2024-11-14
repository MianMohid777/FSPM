const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const refreshTokenValidator = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies?.refresh_token; //Get from Cookies
  if (token) console.log("Cookies mey sey mil giya Token");

  if (
    typeof token === "undefined" ||
    (!token && req.body && req.body.refreshToken)
  ) {
    token = req.body.refreshToken;
  }

  if (typeof token === "undefined" || !token) {
    console.log("Token is Missing");
    res.status(401);
    throw new Error("Token is missing");
  }

  try {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("User is not Authorized || Invalid Access Token");
        throw new Error("User is not Authorized || Invalid Access Token");
      } else {
        console.log(decodedToken.user.email);
        req.user = decodedToken.user;
        next();
      }
    });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Refresh Token");
  }
});
module.exports = refreshTokenValidator;
