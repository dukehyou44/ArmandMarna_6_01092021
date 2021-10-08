const Thing = require('../models/Thing');
//Importer le package fs file system permettant d'accèder au système des fichiers afin de les supprimer
const fs = require('fs');

//CRUD Create Read Uptade Delete
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        //Récupère le nom du fichier 
        //.split => coupe en 2 et récupère avant .../images/ et après /images/...
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };
  
  
exports.getAllThing = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };

exports.likeDislikeSauce = (req, res, next) => {
  const like = req.body.like;
    const userId = req.body.userId;
  
    Thing.findOne({ _id : req.params.id})
    .then (sauce => {
      //Si like est = 1, le user aime
    if (like === 1) {
        // on vérifie si l'utilisateur
        let likeUser = checkUser(sauce.usersLiked, userId);
        // Premier like de l'utilisateur
        if(!likeUser) {
            //let likes = sauce.likes ? sauce.likes : 0;
            sauce.likes += 1;
            sauce.usersLiked.push(userId); 
        } else {
            // l'utilisateur a déjà likeé
            // On veut éviter like multiple
            throw new Error("On ne peut liker une sauce qu'une seule fois");
        }
    }else if (like === -1) {
        // on vérifie si l'utilisateur
        let dislikeUser = checkUser(sauce.usersDisliked, userId);
        // Premier dislike de l'utilisateur
        if(!dislikeUser) {
            //let dislikes = sauce.dislikes ? sauce.dislikes : 0;
            sauce.dislikes += 1;;
            sauce.usersDisliked.push(userId); 
        } else {
            // l'utilisateur a déjà likeé
            // On veut éviter like multiple
            throw new Error("On ne peut disliker une sauce qu'une seule fois");
        }
    }else if (like === 0) {
        //on vérifie le userId dans le tableau usersLiked
        let userLiked = sauce.usersLiked.find (id => id === userId);
            if(userLiked){
                //retire son like
                sauce.likes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.usersLiked = createNewUserIdArray(sauce.usersLiked, userId);
            }
        else {
        //on cherche dans le tableau des usersDisliked
        let userDisliked = sauce.usersDisliked.find (id => id === userId);
            if(userDisliked){
                //retire son dislike
                sauce.dislikes -= 1;
                //on retire le userid du tableau usersLiked
                sauce.usersDisliked = createNewUserIdArray(sauce.usersDisliked, userId);
            }     
        }     
    }
    //Sauvegarde la sauce modifié dans la base de données mongoDB
    sauce.save()
      //retour promise status OK
      .then(() => res.status(201).json({ message: "choix appliqué" }))
      //retour erreur requète
      .catch(error => res.status(400).json({ error }));
  
    })
    //retour erreur communication avec le serveur
    .catch(error => res.status(403).json({ error: error.message}));
};  

function createNewUserIdArray (userIdArray, userId) {
    return userIdArray.filter(id => id !== userId);
}
// ON vérifie si l'utilisateur a déjà liké ou disliké une sauce
function checkUser(userIdArray, userId) {
    return userIdArray.find(id => id ===userId);

}; 
 