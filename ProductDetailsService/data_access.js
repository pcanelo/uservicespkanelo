var fs = require('fs');
var products = JSON.parse(fs.readFileSync('product-detail.json', 'utf8'));

module.exports.getProducts = function() {
  return products;
};

module.exports.findProduct = function(productId) {
 for (var key in products) {
   if (products[key].productId == productId) {
     return products[key];
   }
 }
  return null;
};

module.exports.updateItem = function(itemId, item) {

 for (var key in products) {
   if (products[key].productId == productId) {
     products[key] = item;
     return;
   }
 }  

}; 