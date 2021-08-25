const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.requireAuth = (req, res) => {
  
  const token = req.cookies.session_id;
  console.log(token);
  
  if(!token) {
    return res.sendStatus(401);
  } else {
    let decodedToken = null;
    try{
      decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);    
    } catch (err){
      res.status(200).json({error});
    }
    res.status(200).json(decodedToken.id)
  }
}