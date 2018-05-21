//  OpenShift sample Node application
var express = require('express'),
  app = express(),
  morgan = require('morgan');
const path = require('path')
var bodyParser = require('body-parser');

Object.assign = require('object-assign')
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var config = require('./config/config'); //load the config

var APP_VERSION = '1.0.0-1';
var clientId = process.env.FACEBOOK_ID || 'fakeid';
var clientSecret = process.env.FACEBOOK_SECRET || 'fakesecret';
console.log('clientId=' + clientId + ' clientSecret=' + clientSecret);
//var clientId = '1492519200858678';
//var clientSecret = '4904b011ab92bb1c4340f78b3a33aee7';
var callback = 'https://nodejs-mongo-persistent-rjhnode.193b.starter-ca-central-1.openshiftapps.com/login/facebook/return';

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: callback
  },
  function (accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))
app.use('/', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/', express.static(__dirname + '/node_modules/feather-icons/dist'));
app.use('/', express.static(__dirname + '/node_modules/chart.js/dist'));
app.use('/', express.static(__dirname + '/dist/angapp'));

app.use('/', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

console.log('process.env');
console.log(process.env);
console.log('starting up, config is');
console.log(config);

var db = null,
  dbDetails = new Object();

var initDb = function (callback) {
  if (config.mongoURL == null) {
    console.log('mongoURL null');
    return;
    //mongoURL = "mongodb://10.128.36.106:"
  }

  console.log('connecting to mongo ' + config.mongoURL);

  var mongodb = require('mongodb');
  if (mongodb == null) return;

  mongodb.connect(config.mongoURL, function (err, conn) {
    if (err) {
      console.log('error connecting to mongo ' + err);
      callback(err);
      return;
    }

    db = conn;
    dbDetails.databaseName = db.databaseName;
    dbDetails.url = config.mongoURLLabel;
    dbDetails.type = 'MongoDB';

    console.log('Connected to MongoDB at: %s', config.mongoURL);
  });
};

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mongoose4demo');
if (config.mongoURL != null) {
  console.log('mongoURL !null mongoose');
  mongoose.connect(config.mongoURL);
  var db = mongoose.connection;
  mongoose.Promise = global.Promise;
    
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongoose Connected to MongoDB');
    
    // APIs
    var itemApi = require('./server/item/item.api.js')(app);
    
    var searchApi = require('./server/search/search.api.js')(app);
  });
}
  
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/openshift', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function (err) {});
  }
  if (db) {
    var col = db.collection('counts');
    // Create a document with request IP and current time of request
    col.insert({
      ip: req.ip,
      date: Date.now()
    });
    col.count(function (err, count) {
      if (err) {
        console.log('Error running count. Message:\n' + err);
      }
      res.render('index', {
        pageCountMessage: count,
        dbInfo: dbDetails,
        user: req.user,
        appVersion: APP_VERSION
      });
    });
  } else {
    res.render('index', {
      pageCountMessage: null,
      dbInfo: 'na',
      user: req.user,
      appVersion: APP_VERSION
    });
  }
});

app.get('/login', function (req, res) {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.send("Error login " + err);
  }
});
app.get('/map', function (req, res) {
  try {
    res.render('map');
  } catch (err) {
    console.error(err);
    res.send("Error map " + err);
  }
});
app.get('/maps', function (req, res) {
  try {
    res.render('maps');
  } catch (err) {
    console.error(err);
    res.send("Error maps " + err);
  }
});
app.get('/dashboard', function (req, res) {
  try {
    res.render('dashboard');
  } catch (err) {
    console.error(err);
    res.send("Error dashboard " + err);
  }
});
app.get('/report', function (req, res) {
  try {
    res.render('report');
  } catch (err) {
    console.error(err);
    res.send("Error report " + err);
  }
});
app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),

  // This is what comes back from facebook
  //   user: 
  //   { id: '1660546474037158',
  //     username: undefined,
  //     displayName: 'Robin Hopkins',
  //     name: [Object],
  //     gender: undefined,
  //     profileUrl: undefined,
  //     provider: 'facebook',
  //     _raw: '{"name":"Robin Hopkins","id":"1660546474037158"}',
  //     _json: [Object] },
  //  authInfo: {} },
  function (req, res) {
    console.log('/login/facebook/return');
    console.log(res);
    res.redirect('/');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', {
      user: req.user
    });
  });

app.get('/pagecount', function (req, res) {
  // try to initialize the db on every request if it's not already
  // initialized.
  if (!db) {
    initDb(function (err) {});
  }
  if (db) {
    db.collection('counts').count(function (err, count) {
      res.send('{ pageCount: ' + count + '}');
    });
  } else {
    res.send('{ pageCount: -1 }');
  }
});


// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

initDb(function (err) {
  console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(config.port, config.ip);
console.log('Server running on http://%s:%s', config.ip, config.port);

module.exports = app;