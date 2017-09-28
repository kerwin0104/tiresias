var controller = {
  get (req, res, next) {
    res.render('test', {
      title: 'test template',
      content: 'this is a hbs template',
      params: req.shaman.params
    })
  }
}

module.exports = controller 
