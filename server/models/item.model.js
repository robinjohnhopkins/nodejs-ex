var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    estvalue: Number
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;