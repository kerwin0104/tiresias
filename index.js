var config = require('./config')
var express = require('express')
var kernel = require('./kernel')
var app = express()

app.use(kernel.routeHelper(config))

var port = 8080
console.log('server listen at port:' + port)
app.listen(port)


