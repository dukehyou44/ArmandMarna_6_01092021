//Importation de la fonction bcrypt pour création du hash
const bcrypt = require('bcrypt');
//Importation du package jsonwebtoken pour la création du token
const jwt = require('jsonwebtoken');
//importation du model user 
const User = require('../models/User');
//importation du fichier de config
const config =  require('../config');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        //Création d'un nouveau user
        const user = new User({
          email: req.body.email,
          password: hash
        });
        //sauvegarder le user dans mongoDB
        user.save()
        // user créer avec succes
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          // probleme dans la saisie des données
          .catch(error => res.status(400).json({ error }));
      })
      // Erreur serveur
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  //Cherche si l'email saisie correspond à un email existant
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        //Si email trouvé bcrypt va comparer les 2 hash password, le hash saisie et le hash enregistrer dans mongoDB
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }

            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                // Modifier avec bcrypt ou autre phrase
                `${config.JWT_TOKEN_SECRET}`, 
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};