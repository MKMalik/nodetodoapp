var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set-up template engine

app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000, '192.168.43.179', function(err) {
    if (err) throw err;
    console.log('Server is up and running on 192.168.43.179:3000');
});
