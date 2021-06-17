var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set-up template engine

app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

var host = 'localhost';

//listen to port
app.listen(3000, host, function(err) {
    if (err) throw err;
    console.log('Server is up and running');
});
