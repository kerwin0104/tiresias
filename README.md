# tiresias
tiresias use autorouter for proejct.
Router will auto find controller in controllers folder.
You also use variables in path, if you want get variables of path, just use underscore (_) as first character of the controller folder.

# use
controller folder path
```
test/controllers/_test/index.js
```

you can access this controller by path:
```
http://127.0.0.1:3000/testanything
```

or
```
http://127.0.0.1:3000/othertest
```

 you can get variables from req.tiresias.params like:

```javascript
// this controller will disponse all http method
function controller (req, res, next) {
    res.send(req.tiresias.params.test)
}
module.exports = controller
```
or 
```javascript
var controller = {
  get (req, res, next) { // just disponse http method 'get'
    res.send(req.tiresias.params.id)
  },
  post (req, res, next) { // just disponse http method 'post'
    res.send(req.tiresias.params.id)
  }
}
module.exports = controller
```

you can use hbs template

create a hbs template file at test/templates/_test/index.hbs

use template in test/controllers/_test/index.js like this:

``` javascript
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
```


## run
```
npm install
node test/app.js
```

## test hbs template
http://127.0.0.1:3000/testanything

## test common route
http://127.0.0.1:3000/test/action


## dist
```
|- kernel        // kernel of tiresias
|- test
    |- controllers     // controller files 
          |- _test
              |- index.js
          |- test
              |- action
                  |- index.js
    |- htmls           // html files
        |- testhtml
            |- index.html
        |- page1.html
        |- page2.html
    |- resources       // resource files
    |- static          // static files
    |- templates       // template files 
        |- _test
            |- index.hbs  
|- config.js // config of projects
|- index.js
```

