var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userController = require('../controllers/authentication');
var User = require('../models/user')
var choicesController = require('../controllers/choicesController');


/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('allUsers');
});

router.get('/register', function(req, res, next) {
  res.render('form');
})

router.get('/login', function(req, res, next) {
  res.render('login');
})



router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

//inspiration and part of code from: https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359

router.get('/choices', userController.checkAuth);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Datesite' });
});

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/choices', choicesController.addChoices);


module.exports = router;
