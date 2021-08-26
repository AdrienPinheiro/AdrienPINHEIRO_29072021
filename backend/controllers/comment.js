// Imports

const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require ('../models/index');

const User = db.User;
const Topic = db.Topic;
const Comment = db.Comment;

// Permet de créer un commentaire

exports.post = (req, res, next) => {
   
    const userId = req.params.id
    const commentary = req.body.commentary
    const post_id = req.body.post_id

    User.findOne({attributes: ['id'], where: {id: userId}})
    .then(user => {
        if (user == null) {
            return res.status(400).json({ error: 'Utilisateur non trouvé !'});
        }
    })
    .catch(error => res.status(500).json({error}));

    const comment = Comment.create({
        user_id: userId,
        post_id: post_id,
        commentary: req.body.commentary
    })
    .then(() => res.status(200).json({message: "Commentaire créé !"}))
    .catch(error => res.status(500).json( error ));
    
};

// Permet d'afficher tout les commentaires

exports.getAll = (req, res) => {
    const topicId = req.params.topicId
    Comment.findAll({
        attributes: [ 'id', 'user_id','post_id', 'commentary', 'createdAt' ], 
        where: {post_id: topicId},
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(comment => res.status(200).json(comment))
    .catch((err) => res.status(400).json(err));
}

// Permet de modifier son commentaire

exports.modify = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.SECRET);
    //const userId = decodedToken.userId;
    const commentId = req.params.commentId

    Comment.update({
        commentary: req.body.commentary,
    },
    {attributes: ['id'],where: {id: commentId}})
    .then(() => res.status(200).json({message: "Modifications enregistrées !"}))
    .catch((error) => res.status(500).json({error}));  
}

// Permet de supprimer son commentaire

exports.delete = (req, res) => {
    const commentId = req.params.commentId
    //const userId = req.params.id
    
    Comment.destroy({attributes: ['id'], where: {id: commentId}})
    .then(() => res.status(200).json({message: "Message supprimé !"}))
    .catch(error => res.status(500).json({error}))
}