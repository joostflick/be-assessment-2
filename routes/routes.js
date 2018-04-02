var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userController = require('../controllers/authentication');


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
  delete req.session.authenticated;
  console.log(req.session.authenticated);
  res.redirect('/');
});

router.get('/choices', function(req, res, next){
  res.render('choices');
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Datesite' });
});

router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;
