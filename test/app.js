const config = require('./config')

const tiresias = require('../')
tiresias.setConfig(config)
tiresias.simpleStart(5555)
