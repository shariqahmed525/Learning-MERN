const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('bearer-token');

  // check for token
  if (!token)
    res.status(401).json({ message: "No token, authorization" });

  try {
    // verify token
    const decode = jwt.verify(token, "jwtSecret");

    // Add user from payload
    req.user = decode;
    next();
  }
  catch (e) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;