// Imports

const sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// Init serveur

const app = express();
app.use(cors({credentials: true}));
app.use(cookieParser());

const userRoutes = require('./routes/user');
const topicRoutes = require('./routes/topic');
const commentRoutes = require('./routes/comment');
const adminRoutes = require('./routes/admin');
const checkUser = require('./routes/checkUser');
const admin = require('./middleware/admin');
const requireAuth = require('./middleware/auth');


// Connexion à la base de données

require("./bd-connect.js");

// Permet l'autorisation des demandes de type POST / GET / PUT et autre
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.URL_FRONT);
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Body Parser configuration

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes
app.use('/', userRoutes);
app.use('/me', checkUser);
app.use('/topic', topicRoutes);
app.use('/comment', commentRoutes);
app.use('/admin', adminRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;