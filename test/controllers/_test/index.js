var controller = {
  get (req, res, next) {
    req.getTemplatePath((err, path) => {
      // console.log('path')
      // console.log(path)
      res.render(path)
    })
  }
}

module.exports = controller


