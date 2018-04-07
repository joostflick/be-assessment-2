var User = require('../models/user');
var bcrypt = require('bcrypt');

//hash parameter with bcrypt using 10 iterations and an auto generated hash
function hash(pw){
  var hash = bcrypt.hashSync(pw, 10);
  return pw;
}

//Register function
function register(req, res) {
  //Get the form data and call them user
  var user = req.body;
  //Check if the username already exists, and if thats the case tell the user.
  return User.findOne({username: user.username}, function(err, name) {
    console.log(name);
    if (name) {
      res.render("message", {message: "The username " + name.username + " is taken!", redirect: "/register"});
    } else {
      //Otherwise hash the password and create a user with the input from the form
      console.log(hash(user.password));
    user.password = hash(user.password);
    User.create(user, function(err, newUser) {
      if (err) {
        return res.sendStatus(400);
      }
      res.render("message", {message: "Your account with username " + newUser.username + " is now active", redirect: "/login"});
    });
  }
  });
}

//Login function
function login(req, res) {
  //Take username and password from body and hash the password
  var username = req.body.username;
  var pass = hash(req.body.password);

  //Check if username exists and if it does check username and hashed password
  User.findOne({username: username}, function(err, result) {
    if(!result){
      res.render("message", {message: "No user found", redirect: "/login"})
    } else {
      if (username === result.username && bcrypt.compareSync(pass, result.password)) {
        req.session.userId = result._id;
        return res.redirect('/');
      } else {
        res.render("message", {message: "Wrong password or username, try again", redirect: "/login"})
      }
    }
    });
  }


  function choices(req, res, next){
    sess = req.session;
//Session set when user Request our app via URL
  if(sess.userId) {
    res.render('choices');
}
else {
    res.redirect('unauthorized');
}
  }

  function matches(req, res, next){
    sess = req.session;
//Session set when user Request our app via URL
  if(sess.userId) {
    res.redirect('matches');
}
else {
    res.redirect('unauthorized');
}
  }



module.exports = {
  register: register,
  login: login,
  choices: choices,
  matches: matches
};
