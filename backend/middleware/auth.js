const jwt = require("jsonwebtoken");

const auth = {};

auth.verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies.ssid;
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
