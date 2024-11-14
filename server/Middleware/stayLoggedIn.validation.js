const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const stayLoggedValidator = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  token = req.cookies?.access_token; //Get from Cookies
  if (token) console.log("Cookies mey sey mil giya Token");

  if (
    typeof token === "undefined" ||
    (!token && authHeader && authHeader?.startsWith("Bearer"))
  ) {
    token = authHeader?.split(" ")[1];
  }

  if (typeof token === "undefined" || !token) {
    console.log("Token is Missing"); // New Request
    next(); // Go for LogIn
    return;
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("User is not Authorized || Invalid Access Token");
        next();
        return;
      } else {
        console.log(token);
        console.log("Bhai Agiya Yaha tak Token ley KARR");
        req.user = decoded.user;
        console.log(req.user);
        console.log("Moving to Next API");
        next();
        return;
      }
    });
  } catch (err) {
    res.status(401);
    throw new Error("Invalid Access Token");
  }
});
module.exports = stayLoggedValidator;
