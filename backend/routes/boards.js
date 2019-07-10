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

router.post('/createBoard/', function (req, res, next) {

  const board = req.body.board;

  console.log(board);

  new BoardModel({

    }, {
      new: true
    }).save()
    .then(board => {
      res.send(board);
    })
    .catch(e => {
      res.send('3');
      console.log('Error al guardar la board: ' + e);
    });
})

module.exports = router;