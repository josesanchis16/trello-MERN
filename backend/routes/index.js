//Importamos la conexion con mongo, para que cuando se lea este archivo se conecte con la base de datos automaticamente.
require('../config/mongoose');

var express = require('express');
var router = express.Router();

const url_frontend = require('../config/settings').FRONTEND;

//Importamos el modelo para poderlo utilizar a la hora de manejar datos con mongo
const UserModel = require('../models/User');


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//Registrar un nuevo usuario
router.post('/signup', function (req, res, next) {
  console.log(req.body);
  new UserModel({
      ...req.body,
      info: {
        //Anadimos el avatar por defecto
        avatar: `https://api.adorable.io/avatars/150/${req.body.email}`,
      }
    }).save()
    .then(user => {
      const userToken = user.generateAuthToken();
      user.tokens = [{
        for: 'login',
        token: userToken
      }]
      console.log(user);
      res.send(user);
    })
    .catch(console.log);
})

//Iniciar sesion con un usuario existente
router.post('/login', function (req, res, next) {

  UserModel.findOne({
      "email": req.body.email
    })
    .then(user => {
      const userToken = user.generateAuthToken();
      user.tokens = [{
        for: 'login',
        token: userToken
      }]
      console.log(user);
      res.send(user);
    })
});

module.exports = router;