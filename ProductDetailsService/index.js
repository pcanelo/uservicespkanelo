var express = require('express');
var bodyParser = require('body-parser');
var dao = require("./data_access");
var fs = require('fs'); 

var app = express();
var services = JSON.parse(fs.readFileSync('services.json', 'utf8'));
var name = services.productDetailService.name;
var port = services.productDetailService.port;
var serviceRoute = services.productDetailService.serviceRoute;

app.use(bodyParser.json());

app.get( serviceRoute + "/:id", function(req, res) {
  var product = dao.findProduct(req.params.id);
  if (product === undefined || product === null ) {
    res.statusCode = 404;
    res.end();
  } else {
    res.send(product);
  }
});

app.get(serviceRoute, function(req, res) {
  var products = dao.getProducts();

  if (products === undefined) {
    res.statusCode = 404;
    res.end();
  } else {
    res.send(products);
  }
});

app.put(serviceRoute + "/:id", function(req, res) {
  if (req.params.isbn === undefined || req.body === undefined) {
    res.statusCode = 500;
    res.end();

    return;
  }

  dao.updateProduct(req.params.id, req.body);
  res.end();
});


console.log("Service: '" + name 
          + "'\nRoute: " + serviceRoute 
          + "'\nPort: " + port);

app.listen(port);