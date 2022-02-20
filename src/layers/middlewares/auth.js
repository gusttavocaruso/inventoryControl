const vldt = require("../../utils/validtFuncs");
const { tokenVerify } = require("../services/loginService");

module.exports = (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    const username = tokenVerify(authorization);
    vldt.tokenValidation(username);

    req.user = username;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
