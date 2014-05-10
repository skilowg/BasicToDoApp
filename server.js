var express = require('express');
var app = express();
var mongoose = require('mongoose')

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu')

app.set(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

var Todo = mongoose.model('Todo', {
  text : String
})

app.listen(8080);
console.log("App listening on port 8080");

app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err)
      res.send(err)
      res.json(todos);
  });
});

app.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err)
      res.send(err);

    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });

});

app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});
