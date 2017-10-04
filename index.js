var config = require('./config')
var express = require('express')
var exphbs  = require('express-handlebars');
var kernel = require('./kernel')
var path = require('path')
var app = express()

// set static dir
app.use('/' + config.staticDirName, express.static(path.join(config.rootDir, config.staticDirName)))

// set resource dir
app.use('/' + config.resourceDirName, express.static(path.join(config.rootDir, config.resourceDirName)))

// set html dir
app.use(express.static(path.join(config.rootDir, config.htmlDirName)))

// use hbs template
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.enable('view cache')

// use router
app.use(kernel.routeHelper(config))

var port = 3000
console.log('server listen at port:' + port)
app.listen(port)


