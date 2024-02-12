const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  // Extract JWT token from request headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Attach authenticated user information to request object
    req.currentUser = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
