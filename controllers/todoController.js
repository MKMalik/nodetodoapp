var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({entended: false});

mongoose.connect('mongodb://localhost:27017/todo-app').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR!\n", err);
});

//create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema); //2nd todo, collection name


module.exports = function (app) {

    app.get('/', function(req, res) {
        res.render('home');
    });


    app.get('/todo', function(req, res) {
        //get data from mongoDB and pass it to the view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', {data: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from view and add it to the mongoDB
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data); //send data back to front-end
        });
    });

    app.delete('/todo/:item', function(req, res) {
        //delete the requested item from db
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}
