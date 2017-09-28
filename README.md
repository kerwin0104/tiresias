# shaman
Shaman use autorouter for proejct.
Router will auto find controller in controllers folder.
You also use variables in path, if you want get variables of path, just use underscore (_) as first character of the controller folder.

# use
controller folder path
```
/controllers/user/_id/index/index.js
```

you can access this controller by path:
```
http://yourdomain/user/132323/index  
```

or
```
http://yourdomain/user/2323/index
```

 you can get variables from req.shaman.params like:

```javascript
// this controller will disponse all http method
function controller (req, res, next) {
    res.send(req.shaman.params.id)
}
module.exports = controller
```
or 
```javascript
var controller = {
  get (req, res, next) { // just disponse http method 'get'
    res.send(req.shaman.params.id)
  },
  post (req, res, next) { // just disponse http method 'post'
    res.send(req.shaman.params.id)
  }
}
module.exports = controller
```


# run
npm install
node index.js

## test hbs template
http://127.0.0.1:8080/user/12/index?bb=2

## test common route
http://127.0.0.1:8080/abc


## dist
```
|- kernel        // kernel of shaman
|- controllers
    |- _type
         |- index.js
    |- user
         |- _id
             |- index
                  |- index.js
|- models   // model files
|- views   // view files
|- config.js // config of projects
|- index.js
```

