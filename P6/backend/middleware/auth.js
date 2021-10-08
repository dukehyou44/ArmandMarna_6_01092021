const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = (req, res, next) => {
  try {
    //On récupère le token du header de la requete du POST et on le coupe en 2
    // [1] = la 2eme partie
    const token = req.headers.authorization.split(' ')[1];
    //On créer une constante afin de décodé le token et son contenu
    const decodedToken = jwt.verify(token, `${config.JWT_TOKEN_SECRET}`);
    //On définie un id au token
    const userId = decodedToken.userId;
    //on compare le userid de la requete au userid du token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      //si ce sont les même on passe au middleware suivante avec next
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};