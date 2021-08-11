// Imports

const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require ('../models/index');

const User = db.User;
const Topic = db.Topic;
const Comment = db.Comment;

// Permet de créer un commentaire

exports.post = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    //const userId = decodedToken.userId;
    const regexComment = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
    const userId = req.body.user_id
    const commentary = req.body.commentary
    const post_id = req.body.post_id

    User.findOne({attributes: ['id'], where: {id: userId}})
    .then(user => {
        if (user == null) {
            return res.status(400).json({ error: 'Utilisateur non trouvé !'});
        }
    })
    .catch(error => res.status(500).json({error}));

    if(!commentary.match(regexComment)){
        return res.status(400).json({error: "Caractères invalides dans le post"});
    } else {
        const comment = Comment.create({
            user_id: userId,
            post_id: post_id,
            commentary: req.body.commentary,
            likes: 0,
            dislikes: 0
        })
        .then(() => res.status(200).json({message: "Commentaire créé !"}))
        .catch(error => res.status(500).json( error ));
    }
};

// Permet d'afficher tout les commentaires

exports.getAll = (req, res, next) => {
    const post_id = req.body.post_id

    Comment.findAll({where: {post_id: post_id}})
    .then(comment => res.status(200).json(comment))
    .catch((error) => res.status(400).json({error}));
}

// Permet de modifier son commentaire

exports.modify = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.SECRET);
    //const userId = decodedToken.userId;
    const userId = req.body.user_id

    Comment.update({
        commentary: req.body.commentary,
    },
    {attributes: ['id'],where: {id: userId}})
    .then(() => res.status(200).json({message: "Modifications enregistrées !"}))
    .catch((error) => res.status(500).json({error}));  
}

// Permet de supprimer son commentaire

exports.delete = (req, res, next) => {
    const post_id = req.body.post_id
    const id = req.body.id
    
    Comment.destroy({attributes: ['id'], where: {post_id: post_id, id: id}})
    .then(() => res.status(200).json({message: "Message supprimé !"}))
    .catch(error => res.status(500).json({error}))
}