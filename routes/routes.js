var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userController = require('../controllers/authentication');

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('users');
});

router.get('/register', function(req, res, next) {
  res.render('form');
})

router.get('/login', function(req, res, next) {
  res.render('login');
})


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Datesite' });
});

router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;
