const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
  const auth = req.headers.authorization.split(" ")[1];
  let decode;
  try {
    decode = jwt.verify(auth, "secrete");
  } catch (e) {
    const error = new Error("Authentication failed");
    error.status = 414;
    throw error;
  }
  req.userId = decode.userId;
  next();
};
