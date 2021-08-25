const jwt = require('jsonwebtoken');
const db = require('../models/index');

const User = db.User;

// Permet de vérifier si la personne est admin

module.exports = (req, res, next) => {
    const token = req.headers.session_id;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;

    User.findOne({where: {id: userId}})
    .then(user => {
        if(user.isAdmin === true){
            next()
        } else {
            return res.status(401).json({message: "Vous n'avez pas les droits"})
        }
    })
    .catch(error => res.status(500).json({error}))
}