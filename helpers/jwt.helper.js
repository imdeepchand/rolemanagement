const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token;

  if (!token) {
    return res.status(403).send("A token is requires for authentication");
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
