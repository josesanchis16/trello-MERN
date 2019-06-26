//Importamos la conexion con mongo, para que cuando se lea este archivo se conecte con la base de datos automaticamente.
require('../config/mongoose');

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var SECRET_AUTH_JWT = require('../config/settings').SECRET_AUTH_JWT;

//Importamos el modelo para poderlo utilizar a la hora de manejar datos con mongo
const UserModel = require('../models/User');

/* GET users listing. */
router.get('/getAll', function (req, res, next) {
  UserModel.find({})
    .then(users => {
      res.send(users);
    })
});

router.post('/getUser', function (req, res, next) {
  try {
    const token = jwt.verify(req.body.token, SECRET_AUTH_JWT);
    UserModel.findOne({
        _id: token._id,
      })
      .then(user => {
        res.send(user);
      })
  } catch (e) {
    console.log(e);
    res.status(501).send(e);
  }
})

module.exports = router;