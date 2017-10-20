var controller = {
  get (req, res, next) {
    console.log(22332)
    res.send('test action')
  }
}

module.exports = controller


