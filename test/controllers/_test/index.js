var controller = {
  get (req, res, next) {
    req.getTemplatePath((err, path) => {
      res.render(path, {
        params: req.tiresias.params
      })
    })
  }
}

module.exports = controller


