var User = require('../models/user');
var bcrypt = require('bcrypt');

//Register function
function register(req, res) {
  //Get the form data and call them user
  var user = req.body;
  //Check if the username already exists, and if thats the case tell the user.
  return User.findOne({
    username: user.username
  }, function(err, name) {
    if (name) {
      res.render('message', {
        message: 'The username ' + name.username + ' is taken!',
        redirect: '/register'
      });
    } else {
      //Otherwise hash the password (auto generated salt and 10 iterations) and create a user with the input from the form
      user.password = bcrypt.hashSync(user.password, 10);
      User.create(user, function(err, newUser) {
        if (err) {
          return res.sendStatus(400);
        }
        res.render('message', {
          message: 'Your account with username ' + newUser.username + ' is now active',
          redirect: '/login'
        });
      });
    }
  });
}


//Login function
function login(req, res) {
  //Take username from body
  var username = req.body.username;


  //Check if username exists and if it does check username and hash
  //Also initiate a session to further track whether the user is logged in
  User.findOne({
    username: username
  }, function(err, result) {
    if (!result) {
      res.render('message', {
        message: 'Username ' + username + ' does not exist',
        redirect: '/login'
      });
    } else {
      if (username === result.username && bcrypt.compareSync(req.body.password, result.password)) {
        req.session.userId = result._id;
        return res.redirect('/');
      } else {
        res.render('message', {
          message: 'Wrong password or username, try again',
          redirect: '/login'
        });
      }
    }
  });
}

//Authenticate user
function choices(req, res, next) {
  sess = req.session;
  //Session set when user Request our app via URL
  if (sess.userId) {
    res.render('choices');
  } else {
    res.redirect('unauthorized');
  }
}
//Authenticate user
function matches(req, res, next) {
  sess = req.session;
  //Session set when user Request our app via URL
  if (sess.userId) {
    res.redirect('matches');
  } else {
    res.redirect('unauthorized');
  }
}


//Export functions to be used in routes.js
module.exports = {
  register: register,
  login: login,
  choices: choices,
  matches: matches
};
