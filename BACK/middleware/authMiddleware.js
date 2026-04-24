const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  try {
    // 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // 3. Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info
    req.auth = {
      userId: decodedToken.userId
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authCheck;