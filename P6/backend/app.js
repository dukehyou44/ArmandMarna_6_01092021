//importation de express
const express = require('express');
//importation de mongoose
const mongoose = require('mongoose');
//importation du fichier de config
const config =  require('./config');
//importation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
//importation de path permettant d'accéder au path du serveur
const path = require('path');

//connexion de l'API au cluster MongoDB
mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.pn9z3.mongodb.net/${config.DATA_BASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//creation d'une application express 
const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json());  
//indique à express qu' il faut gérer la ressource images de manière statique à chaque requête vers la route images qu'elle reçoit
app.use('/images', express.static(path.join(__dirname, 'images')));
//activation des routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//exportation de notre application 
module.exports = app;



