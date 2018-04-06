var User = require('../models/user');
var bcrypt = require('bcrypt');


function register(req, res) {
  var user = req.body;
  return User.findOne({
    username: user.username
  }, function(err, result) {
    if (err) {
      return res.sendStatus(400);
    }
    if (result) {
      return res.sendStatus(400);
    }
    var hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    User.create(user, function(err, newUser) {
      if (err) {
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
    });
  });
}

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var hash = bcrypt.hashSync(password, 10);

  User.findOne({username: username}, function(err, result) {
    try{
      if (username === result.username && bcrypt.compareSync(password, hash)) {
        console.log(result)
        req.session.userId = result._id;
        return res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
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
