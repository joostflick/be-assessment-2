var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userController = require('../controllers/authentication');
var User = require('../models/user')
var choicesController = require('../controllers/choices');
var matchesController = require('../controllers/matches');

//Render index and give it req.session to show/hide items based on user status
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Datesite',
    session: req.session
  });
});

//Get user detail page if logged in
router.get('/user/:id', function(req, res, next) {
  if (!req.session.userId) {
    res.render('unauthorized');
  } else {
    var id = req.params.id;
    User.findById(id).exec(function(error, user) {
      if (!user) {
        res.sendStatus(400);
      } else {
        res.render('user', {
          user: user
        });
      }
    });
  }
});

//Get connection detail page if logged in
router.get('/connection/:id', function(req, res, next) {
  if (!req.session.userId) {
    res.render('unauthorized');
  } else {
    var id = req.params.id;
    User.findById(id).exec(function(error, user) {
      if (!user) {
        res.sendStatus(400);
      } else {
        res.render('connection', {
          user: user
        });
      }
    });
  }
});

//Get requests
router.get('/register', function(req, res, next) {
  res.render('form');
})

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.get('/unauthorized', function(req, res, next) {
  res.render('unauthorized');
})


//Logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    //Delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//Get requests that are forwarded to a controller
router.get('/choices', userController.choices);
router.get('/matches', matchesController.findMatches);
router.get('/connections', matchesController.getConnections);

//Post requests that are forwarded to a controller
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/choices', choicesController.addChoices);
router.post('/user:id', matchesController.addConnection);
router.post('/remove:id', matchesController.removeConnection);


module.exports = router;
