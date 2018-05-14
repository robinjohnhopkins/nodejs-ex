module.exports = function (app) {

    var Item = require('../models/item.model.js');

  app.get('/search', function(req, res) {
    // {estvalue: { $gte: 100}}
    Item.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/search/count', function(req, res) {
    Item.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // find by id
  app.get('/search/:id', function(req, res) {
    Item.findOne({_id: req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });



}