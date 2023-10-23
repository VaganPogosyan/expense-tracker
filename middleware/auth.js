const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.JWT_SALT);
    // create a user objec ton the request object so all the routes below this middleware will have access to the req.user with the jwt payload which is user data
    req.user = jwt_payload;
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
    return;
  }

  next();
};
module.exports = auth;
