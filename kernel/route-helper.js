var path = require('path')
var fs = require('fs')
var glob = require("glob")

var globPathCache = {}

class RouterDisponser {
  constructor (config) {
    this.params = {}
    this.filePathArr = []
    this.reqPathArr = []

    this.controllerDirPath = path.join(config.rootDir, `./${config.controllerDirName}`)
    this.viewDirPath = path.join(config.rootDir, `./${config.viewDirName}`)
    this.modelDirPath = path.join(config.rootDir, `./${config.modelDirName}`)
  }

  _findFilePathByType (type, reqPath, callback) {
    var reqPathArr = reqPath.split('/')
  
    var globPathArr = reqPathArr.map(function (item, index) {
      return index === 0 ? '.' : '*'
    })

    globPathArr.push('index.*')

    var globPath = path.join(this[`${type}DirPath`], globPathArr.join('/'))
    
    if (globPathCache[globPath]) {
      callback(null, globPathCache[globPath])
    } else {
      glob(globPath, (err, filePaths) => {
        if (err) {
          callback(err)
        } else {
          for (let filePath of filePaths) {
            var newFilePath = this._fixGlobPath(filePath)
            var filePathArr = newFilePath.split('/')
            var isPathMath = this._isPathMatch(reqPathArr, filePathArr)
            if (isPathMath) {
              this.reqPathArr = reqPathArr
              this.filePathArr = filePathArr
              globPathCache[globPath] = filePath
              callback(null, filePath)
              return
            }
          }
          callback('file not found')
        }
      }) 
    }
  
  }

  _isPathMatch (reqPathArr, filePathArr) {
    for (let i = 0,len = reqPathArr.length, filePath, reqPath; i<len; i++) {
      reqPath = reqPathArr[i]
      filePath = filePathArr[i]
      if (filePath.indexOf('_') === 0) {
        continue
      } else if (filePath === reqPath) {
        continue
      } else {
        return false
      }
    }
    return true
  }

  _parseParams () {
    var params = this.params
    this.filePathArr.forEach((filePath, index) => {
      if (filePath.indexOf('_') === 0) {
        var key = filePath.substr(1)
        params[key] = this.reqPathArr[index]
      }
    })
  }

  _fixGlobPath (path) {
    if (path.indexOf(this.controllerDirPath) === 0) {
      return path.replace(this.controllerDirPath, '')
    }
    return path
  }

  getDisponser () {
    return (req, res, next) => {
      this._findFilePathByType('controller', req.path, (err, filePath) => {
        if (err) {
          next()
        } else {
          var controller = require(filePath)
          if (typeof controller !== 'function') {
            var method = req.method.toLowerCase()
            if (typeof controller[method] === 'function') {
              controller = controller[method]
            } else {
              return next()
            }
          }
          this._parseParams()
          req.tiresias = {
            router: this,
            params: this.params
          }
          controller(req, res, next)
        }
      })
    }   
  }
}

function routeHelper (config) {
  config = config || {}
  var helper = new RouterDisponser(config) 
  return helper.getDisponser()
}

module.exports = routeHelper
