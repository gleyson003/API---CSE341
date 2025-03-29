module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "User not founded!" });
  }
  next();
};