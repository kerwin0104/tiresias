var controller = {
  get (req, res, next) {
    res.render('test', {
      title: 'test template',
      content: 'this is a hbs template',
      params: req.tiresias.params
    })
  }
}

module.exports = controller 
