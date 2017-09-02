var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
mongoose = require('mongoose');
Task = require('./app/models/todolistModel'); // Model Loading Here
bodyParser = require('body-parser');

// Mongoose URL Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/todolistRoutes'); // Importing routes
routes(app); // Register the route

app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
    // Added a Middleware for interactive message for an error
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);