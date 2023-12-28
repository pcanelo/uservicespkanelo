var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var net = require("./network_api_access");
var app = express();
var services = JSON.parse(fs.readFileSync('services.json', 'utf8'));
var name = services.productService.name;
var port = services.productService.port;
var serviceRoute = services.productService.serviceRoute;

app.get(serviceRoute + "/:id", function(req, res) {
	
    var promise = net.getProduct(req.params.id);
    promise.then((data) => { 
          res.send(data);
        }
    ).catch( (err) => { 
        res.statusCode = 404;
        res.end();
      } 
    );
  
  });

console.log("Service: '" + name 
          + "'\nRoute: " + serviceRoute 
          + "'\nPort: " + port);

app.listen(port);