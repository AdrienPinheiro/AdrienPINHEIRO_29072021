const jwt = require('jsonwebtoken');

// Vérifie l'identifiant de l'utilisateur grâce au token 
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session_id;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Utilisateur invalide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide!')
    });
  }
};

