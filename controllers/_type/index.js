var controller = {
  get (req, res, next) {
    console.log(req.shaman)
    res.send('222')
    // next()
  }
}

module.exports = controller 
