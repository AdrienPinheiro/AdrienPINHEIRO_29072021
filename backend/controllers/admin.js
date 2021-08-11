// Import 

const { resolveSoa } = require('dns');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require ('../models/index');

const User = db.User;
const Topic = db.Topic;
const Comment = db.Comment;

// Permet d'afficher tout les utilisateurs non admin

exports.getAllUser = (req, res, next) => {
    User.findAll({where: {isAdmin: 0}})
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({error}))
}

// Permet d'afficher un utilisateur et ses informations

exports.getOneUser = (req, res, next) => {
    User.find({attributes: [ 'id', 'firstname', 'lastname', 'pseudo', 'email', 'isAdmin', 'user_img'],where: { id: req.params.id }})
    .then(user => res.status(200).json({user}))
    .catch(error => res.status(400).json({error}))
}

// Permet de supprimer un utilisateur 

exports.deleteOneUser = (req, res, next) => {
    Comment.destroy({where: {user_id: req.params.id}})
    Topic.destroy({where: {user_id: req.params.id}})
    User.destroy({where: {id: req.params.id}})
    .then(() => res.status(200).json({message: "Vous avez supprimé cet utilisateur"}))
    .catch(error => res.status(500).json({error}))
}