const jwt = require("jsonwebtoken");

const config = process.env;

module.exports = {
  verifyToken(req, res, next) {
    const token =
      req.body.api_token ||
      req.query.api_token ||
      req.headers["x-access-token"] ||
      req.headers["authorization"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const split = token.split(" ");
      var decoded = {};
      if (split.length == 1) {
        decoded = jwt.verify(token, config.TOKEN_KEY);
      } else {
        decoded = jwt.verify(split[1], config.TOKEN_KEY);
      }
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  },
};
