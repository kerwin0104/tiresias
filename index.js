var config = require('./config')
var express = require('express')
var exphbs  = require('express-handlebars');
var kernel = require('./kernel')
var path = require('path')
var app = express()

var tiresisa = {
  setConfig (obj) {
    if (typeof obj === 'object') {
      config = Object.assign({}, config, obj)
    } else {
      throw new Error('Arguments must be an object.')
    }
    console.log(config)
  },

  useRouter () {
    // use router
    app.use(kernel.routeHelper(config))
  },

  useStatic () {
    // set static dir
    app.use('/' + config.staticDirName, express.static(path.join(config.rootDir, config.staticDirName)))
    
    // set resource dir
    app.use('/' + config.resourceDirName, express.static(path.join(config.rootDir, config.resourceDirName)))
    
    // set html dir
    app.use(express.static(path.join(config.rootDir, config.htmlDirName)))
  },

  useHandlebars () {
    // use hbs template
    app.engine('.hbs', exphbs({extname: '.hbs'}))
    app.set('view engine', '.hbs')
    app.enable('view cache')
  },

  getExpressInstance () {
    return app
  },

  simpleStart (port = 3000) {
    this.useStatic()
    this.useRouter()
    this.useHandlebars()
    console.log(`tiresias listen at port : ${port}`)
    app.listen(port)
    return app
  }
}

module.exports = tiresisa


