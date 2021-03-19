const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('getting token');
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      console.log('verifying token');
      jwt.verify(token, 'secret_or_private_key_asdfg');
      next();
    } catch(error) {
      res.status(401).json({
        message: 'Authentification failed while checking for validatin of token'
      });
    }
  } catch (error) {
      res.status(401).json({
        message: 'Authentification failed check-atuthentification.ts'

      });
  }

};
