//Importamos la conexion con mongo, para que cuando se lea este archivo se conecte con la base de datos automaticamente.
require('../config/mongoose');
const jwt = require('jsonwebtoken');

var express = require('express');
var router = express.Router();

const SECRET_AUTH_JWT = require('../config/settings').SECRET_AUTH_JWT;

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
      user.tokens = {
        'login': userToken,
      }
      console.log(user);
      res.send(user);
    })
    .catch(console.log);
})

//Iniciar sesion con un usuario existente
router.post('/login', function (req, res, next) {
  let pass = req.body.password;

  UserModel.findOne({
      "email": req.body.email,
    })
    .then(user => {
      if (!user) res.send('2'); //El correo electronico no existe
      user.comparePassword(pass, function (error, isMatch) {
        if (isMatch && !error) {
          const userToken = user.generateAuthToken();
          user.tokens = {
            login: userToken
          }
          console.log(user);
          res.send(user);
        } else {
          console.log('Error de autentificacion');
          res.send('2'); //La contraseña es incorrecta
        }
      });
    })
});


//Conseguir la informacion de un token
router.get('/getUserFromToken/:token', function (req, res, next) {
  let token = req.params.token;
  let user = jwt.verify(token, SECRET_AUTH_JWT);
  UserModel.findOne({
      _id: user._id,
    }).then(completeUser => {
      console.log(completeUser);
      res.send(completeUser);
    })
    .catch(err => {
      console.log();
    });
})
module.exports = router;