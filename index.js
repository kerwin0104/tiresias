var config = require('./config')
var express = require('express')
var exphbs  = require('express-handlebars');
var kernel = require('./kernel')
var app = express()
app.use(express.static('static'))
app.use(kernel.routeHelper(config))

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

var port = 3000
console.log('server listen at port:' + port)
app.listen(port)


