//Importamos la conexion con mongo, para que cuando se lea este archivo se conecte con la base de datos automaticamente.
require('../config/mongoose');

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var SECRET_AUTH_JWT = require('../config/settings').SECRET_AUTH_JWT;

//Importamos el modelo para poderlo utilizar a la hora de manejar datos con mongo
const BoardModel = require('../models/Board');

/* GET users listing. */
router.get('/getAll', function (req, res, next) {
  BoardModel.find({})
    .then(boards => {
      res.send(boards);
    })
});

module.exports = router;