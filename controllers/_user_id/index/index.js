var controller = {
  get (req, res, next) {
    console.log(req.shaman.params)
    console.log(req.query)
    res.send('3666')
    // next()
  }
}

module.exports = controller 
