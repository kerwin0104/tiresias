var controller = {
  get (req, res, next) {
    console.log(22332)
    req.getTemplatePath((err, path) => {
      console.log('path')
      console.log(path)
    })
    // res.send('test action')
  }
}

module.exports = controller


