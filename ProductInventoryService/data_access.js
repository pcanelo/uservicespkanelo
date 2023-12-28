var fs = require('fs');
var inventory = JSON.parse(fs.readFileSync('inventory.json', 'utf8'));

module.exports.getItems = function() {
  return inventory;
};

module.exports.findItem = function(itemId) {
 for (var key in inventory) {
   if (inventory[key].itemId == itemId) {
     return inventory[key];
   }
 }
  return null;
};

module.exports.updateItem = function(itemId, item) {

 for (var key in inventory) {
   if (inventory[key].itemId == itemId) {
     inventory[key] = item;
     return 
   }
 }  
 
};