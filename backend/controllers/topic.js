// Imports

const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require ('../models/index');

const User = db.User;
const Topic = db.Topic;

// Permet de créer un message sur le fil d'actualité de la messagerie

exports.post = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    //const userId = decodedToken.userId;
    const regexTopic = /[a-zA-Z0-9 _.,'’(Ééèàû)&]+$/;
    const content = req.body.content;
    const userId = req.body.user_id
    User.findOne({attributes: ['id'], where: {id: userId}})
    .then(user => {
        if (user == null) {
            return res.status(400).json({ error: 'Utilisateur non trouvé !'});
        }
    })
    .catch(error => res.status(500).json({error}));

    if(!content.match(regexTopic)){
        return res.status(400).json({error: "Caractères invalides dans le post"});
    } else {
        const topic = Topic.create({
            user_id: userId,
            title: req.body.title,
            content: req.body.content,
            image: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
            likes: 0,
            dislikes: 0
        })
    .then(topic => res.status(201).json(topic))
    .catch(error => res.status(500).json({error}));
    }
};

// Permet d'afficher tout les messages créés

exports.getAll = (req, res, next) => {
    Topic.findAll()
    .then(topic => res.status(200).json(topic))
    .catch(() => res.status(400).json({error}));
};

// Permet de modifier un message que l'on avait créé

exports.modify = (req, res, next) => {
    //const token = req.headers.authorization.split(' ')[1];
    //const decodedToken = jwt.verify(token, process.env.SECRET);
    //const userId = decodedToken.userId;
    const userId = req.body.user_id

    Topic.update({
        title: req.body.title,
        content: req.body.content,
        image: req.body.content && req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
    },
    {attributes: ['id'],where: {id: userId}})
    .then(() => res.status(200).json({message: "Modifications enregistrées !"}))
    .catch((error) => res.status(500).json({error}));  
};

// Permet de supprimer un message que l'on avait posté

exports.delete = (req, res, next) => {
    const id = req.body.id;
    
    Topic.findOne({where: {id: id}})
    .then(topic => {
      if(topic.image !== null){
        const filename = topic.image.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
        Topic.destroy({attributes:['id'], where: {id: id}})
          .then(() => res.status(200).json({message: "Message supprimé !"}))
          .catch((error) => res.status(402).json({error}))
      })
      } else {
        Topic.destroy({attributes:['id'], where: {id: id}})
          .then(() => res.status(200).json({message: "Message supprimé !"}))
          .catch((error) => res.status(401).json({error}))
      }
    })
    .catch(error => res.status(400).json({error}));
};