var express = require('express');
var bodyParser = require('body-parser');
var dao = require("./data_access");
var fs = require('fs');

var app = express();
var services = JSON.parse(fs.readFileSync('services.json', 'utf8'));
var name = services.productInventoryService.name;
var port = services.productInventoryService.port;
var serviceRoute = services.productInventoryService.serviceRoute;


app.use(bodyParser.json()); 

app.get(serviceRoute + "/:id", function(req, res) {
  var item = dao.findItem(req.params.id);
  if (item === undefined || item === null) {
    res.statusCode = 404;
    res.end();
  } else {
    res.send(item);
  }
});

app.get(serviceRoute, function(req, res) {
  var items = dao.getItems();

  if (items === undefined) {
    res.statusCode = 404;
    res.end();
  } else {
    res.send(items);
  }
});

app.put(serviceRoute + "/:id", function(req, res) {
  if (req.params.id === undefined || req.body === undefined) {
    res.statusCode = 500;
    res.end();

    return;
  }

  dao.updateItem(req.params.id, req.body);
  res.end();
});


console.log("Service: '" + name 
          + "'\nRoute: " + serviceRoute 
          + "'\nPort: " + port);

app.listen(port);