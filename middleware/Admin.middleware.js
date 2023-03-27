const jwt = require("jsonwebtoken");

const AdminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ message: "Token not present" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.adminId=decoded.adminId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = AdminMiddleware;
