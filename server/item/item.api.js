function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
     text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = function (app) {

  var Item = require('../models/item.model');

  app.get('/api/items', function (req, res) {
    // {estvalue: { $gte: 100}}
    Item.find({}, function (err, docs) {
      if (err) return console.error(err);
      res.json(docs);
    });
  });

  // count all
  app.get('/api/items/count', function (req, res) {
    Item.count(function (err, count) {
      if (err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/api/item', function (req, res) {
    var obj = new Item(req.body);
    obj.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // create sbe post
  app.get('/api/createitem', function (req, res) {
    var name = 'sweet' + makeid(); 
    var awesome_instance = new Item({ 
      name: name, 
      description: 'sweet',
      category: 'cat 1',
      estvalue: 23
    });
    awesome_instance.save(function(err, obj) {
      if(err) return console.error(err);
      res.status(200).json(obj);
    });
  });

  // find by id
  app.get('/api/item/:id', function (req, res) {
    Item.findOne({ _id: req.params.id }, function (err, obj) {
      if (err) return console.error(err);
      res.json(obj);
    })
  });

  // update by id
  app.put('/api/item/:id', function (req, res) {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/api/item/:id', function (req, res) {
    Item.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return console.error(err);
      res.sendStatus(200);
    });
  });

  // Sum estimated value of all items
  app.get('/api/items/valuesum', function (req, res) {
    Item.aggregate(
      { $group: {
          _id: null,
          total: { $sum: { $add: ["$estvalue"]} }
        }        
      },
      function (err, result) {
        if (err) return console.error(err);
        res.json(result);
      });
  });

}