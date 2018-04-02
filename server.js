//  OpenShift sample Node application
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var morgan = require('morgan');
var app = express();
Object.assign = require('object-assign')

//app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = '';

  var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);


// if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
//   var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
//     mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
//     mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
//     mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
//     mongoPassword = process.env[mongoServiceName + '_PASSWORD']
//   mongoUser = process.env[mongoServiceName + '_USER'];

//   if (mongoHost && mongoPort && mongoDatabase) {
//     mongoURLLabel = mongoURL = 'mongodb://';
//     if (mongoUser && mongoPassword) {
//       mongoURL += mongoUser + ':' + mongoPassword + '@';
//     }
//     // Provide UI label that excludes user id and pw
//     mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
//     mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

//   }
// }
// var db = null,
//   dbDetails = new Object();

// var initDb = function (callback) {
//   if (mongoURL == null) { return;}

//   var mongodb = require('mongodb');
//   if (mongodb == null) { return;}

//   mongodb.connect(mongoURL, function (err, conn) {
//     if (err) {
//       callback(err);
//       return;
//     }

//     db = conn;
//     dbDetails.databaseName = db.databaseName;
//     dbDetails.url = mongoURLLabel;
//     dbDetails.type = 'MongoDB';

//     console.log('Connected to MongoDB at: %s', mongoURL);
//   });
// };

// app.get('/', function (req, res) {
//   // try to initialize the db on every request if it's not already
//   // initialized.
//   if (!db) {
//     initDb(function (err) { });
//   }
//   if (db) {
//     var col = db.collection('counts');
//     // Create a document with request IP and current time of request
//     col.insert({ip: req.ip, date: Date.now()});
//     col.count(function (err, count) {
//       if (err) {
//         console.log('Error running count. Message:\n' + err);
//       }
//       res.render('index.html', {pageCountMessage: count, dbInfo: dbDetails});
//     });
//   } else {
//     res.render('index.html', {pageCountMessage: null});
//   }
// });

// app.get('/pagecount', function (req, res) {
//   // try to initialize the db on every request if it's not already
//   // initialized.
//   if (!db) {
//     initDb(function (err) { });
//   }
//   if (db) {
//     db.collection('counts').count(function (err, count) {
//       res.send('{ pageCount: ' + count + '}');
//     });
//   } else {
//     res.send('{ pageCount: -1 }');
//   }
// });

// error handling
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something bad happened!');
// });

// initDb(function (err) {
//   console.log('Error connecting to Mongo. Message:\n' + err);
// });


app.get('/', function (req, res) {
  res.render('index', {
      title: 'Hello from render',
      nav: [{
          Link: '/Books',
          Text: 'Books'
      }, {
          Link: '/Authors',
          Text: 'Authors'
      }]
  });
});

app.get('/books', function (req, res) {
  res.send('Hello Books');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
