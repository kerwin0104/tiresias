var path = require('path')
var fs = require('fs')
var glob = require("glob")
var globPathCache = {}

function cacheGlob (globPath, callback) {
  var cache = globPathCache[globPath]
  if (cache) {
    callback(null, cache)
  } else {
    glob(globPath, (err, filePaths) => {
      if (!err) {
        globPathCache[globPath] = filePaths
      }
      callback(err, filePaths)
    })
  }
}

class RouterDisponser {
  constructor (config) {
    // this.params = {}
    this.filePathArr = []
    this.reqPathArr = []
    this.config = config
  }

  _findFilePathInDirctory (baseDirPath, reqPath, callback) {
    var reqPathArr = reqPath.split('/')
    this.reqPathArr = reqPathArr
  
    var globPathArr = reqPathArr.map(function (item, index) {
      return index === 0 ? '.' : '*'
    })

    globPathArr.push('index.*')

    var globPath = path.join(baseDirPath, globPathArr.join('/'))
    
    var time = +new Date
    cacheGlob(globPath, (err, filePaths) => {
      if (err) {
        callback(err)
      } else {
        for (let filePath of filePaths) {
          var relativeFilePath = `/${path.relative(baseDirPath, filePath)}`
          var filePathArr = relativeFilePath.split('/')
          var isPathMath = this._isPathMatch(reqPathArr, filePathArr)
          if (isPathMath) {
            this.filePathArr = filePathArr
            callback(null, filePath)
            return
          }
        }
        callback('file not found')
      }
    }) 
  
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
    var params = this.params = {}
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
    var config = this.config
    return (req, res, next) => {
      var controllerDirPath = path.join(config.rootDir, config.controllerDirName)
      this._findFilePathInDirctory(controllerDirPath, req.path, (err, filePath) => {
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
          this._addParams(req)
          this._addTemplateMethod(req)
          controller(req, res, next)
        }
      })
    }   
  }

  _addParams (req) {
    this._parseParams()
    req.tiresias = {
      router: this,
      params: this.params
    }
  }

  _addTemplateMethod (req) {
    var config = this.config
    var that = this
    req.getTemplatePath = function (callback) {
      var templateDirPath = path.join(config.rootDir, config.templateDirName)
      that._findFilePathInDirctory(templateDirPath, req.path, (err, filePath) => {
        callback(err, filePath)
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
