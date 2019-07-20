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

  const board = req.body;

  console.log(board);

  new BoardModel({
    ...board
  }).save()
    .then(board => {
      res.send(board);
    })
    .catch(e => {
      res.send('31');
      console.log('Error al guardar la board: ' + e);
    });
});

router.post('/getUserBoards', function (req, res, next) {
  const id = req.body.userId;
  console.log(id);
  BoardModel.find({
    admin: id
  })
    .then(boards => res.send(boards))
    .catch(e => {
      console.log(e)
      res.send('32');
    });
});

router.post('/newList', function (req, res, next) {
  const list = req.body.list;
  BoardModel.findOneAndUpdate({
    _id: list.parentID,
  }, {
      $push: {
        listas: [
          list
        ]
      }
    }, {
      new: true
    })
    .then(board => {
      console.log('Lista insertada correctamente en la base de datos');
      res.send(board);
    })
    .catch(e => {
      console.log('Se ha producido un error en la insercion de la base de datos: ' + e);
      res.send('34');
    });
});

router.post('/newTask', function (req, res) {
  const task = req.body.task;

  //db.getCollection('boards').findOneAndUpdate({_id : ObjectId("5d33235bf8881144d22a0cdb"), "listas.tareas._id" : 1563633483070.0}, {$push : {"listas.$.tareas" : {'name' : 'id_de_prueba'}}}, {new:true})
  BoardModel.findOneAndUpdate({
    _id: task.board_id,
    "listas._id": task.list_id
  }, { 
    $push: { 
      "listas.$.tareas" : task 
    } 
  },
    { new: true })
    .then(board => {
      console.log(board);
      res.send(board);
    })
    .catch(e => {
      console.log('No se ha podido insertar la tarea en la base de datos');
      res.send('35');
    });
})

module.exports = router;