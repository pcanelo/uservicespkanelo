var http = require('http');
var fs = require('fs');
var services = JSON.parse(fs.readFileSync('services.json', 'utf8'));
var details = services.productDetailService;
var inventory = services.productInventoryService;

module.exports.getProduct = function (itemId) {

  const url_details = details.server + ":" + details.port + details.serviceRoute + "/" + itemId;
  const url_inventory = inventory.server + ":" + inventory.port + inventory.serviceRoute + "/" + itemId;

  var promise_details = callApi(url_details);
  var promise_inventory = callApi(url_inventory);

  return new Promise((resolve, reject) => {
    Promise.all([promise_details, promise_inventory])
      .then((values) => {
        if (values != null && values.length === 2 && values[0] != null && values[1] != null) {
          var obj1 = JSON.parse(values[0]);
          var obj2 = JSON.parse(values[1]);
          if (obj1.productId === obj2.itemId) {
            var result = Object.assign(obj1, { 'quantity': obj2.quantityOnHand })
            resolve(result);
          } else {
            reject("mismatched results returned")
          }
        } else {
          reject("partial or no results returned")
        }
      }).catch((err) => {
        if (err) { console.log(err) }
        reject(err)
      });
  });
}

const callApi = function(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Load Failed, status code: ' + response.statusCode + ", url: " + url));
       }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
          if(body.length > 0){
            resolve(body.join(''));
          }else{
            resolve(null);
          }
        }
      );
      
    });
    request.on('error', (err) => { 
        reject(err);
      })
    })
};