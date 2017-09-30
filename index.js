var config = require('./config')
var express = require('express')
var exphbs  = require('express-handlebars');
var kernel = require('./kernel')
var path = require('path')
var app = express()
app.use(express.static(path.join(config.rootDir, 'static')))
app.use(kernel.routeHelper(config))

app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.enable('view cache')

var port = 3000
console.log('server listen at port:' + port)
app.listen(port)


