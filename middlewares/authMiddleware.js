const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ success: false, message: "Token is required" });

  const tokenWithoutBearer = token.replace("Bearer ", "");

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid Token" });

    req.user = decoded;
    next();
  });
};
