const { signInService } = require('../services/loginService');

const signIn = async (req, res, next) => {
  try {
    const loginData = req.body;
    const token = signInService(loginData);

    return res.status(202).json({ token });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  signIn,
};
