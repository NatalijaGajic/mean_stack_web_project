const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('getting token');
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      console.log('verifying token');
      const decodedToken = jwt.verify(token, 'secret_or_private_key_asdfg');
      const adminID = '5d5a64fd0caff92080bed863';
      if(decodedToken. userId === adminID){
        next();
      } else {
        return res.status(401).json({
          message: 'Autorization failed while checking for admin ID'
        })
      }
    } catch(error) {
      res.status(401).json({
        message: 'Autorization failed while checking for validation of token'
      });
    }
  } catch (error) {
      res.status(401).json({
        message: 'Autorization failed check-atuthentification.ts'

      });
  }

};
