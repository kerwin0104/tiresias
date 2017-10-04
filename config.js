const path = require('path')

var config = {
  // 'rootDir': __dirname,
  // 'rootDir': '/Users/work/Documents/projects/gitlab/tiresias-webpack/dist',
  'rootDir': path.join(__dirname, 'test'),
  'controllerDirName': 'controllers',
  'htmlDirName': 'htmls',
  'resourceDirName': 'resources',
  'staticDirName': 'views',
  'templateDirName': 'templates'
}
module.exports = config
