var User = require('../models/user')



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
    User.create(user, function(err, newUser) {
      if (err) {
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
      res.redirect('/')
    });
  });
}

/*function login(req, res) {
  var user = req.body;
  console.log(user.username, user.password);

  User.findOne({
    username: user.username,
    password: user.password
  }, function(err, result) {
    if (err) {
      return res.sendStatus(400);
    }
    if (!res) {
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  });
}*/

//check if the user is allowed to view this page
function checkAuth(req, res, next){
  console.log(req.path);
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.render('unauthorized');
        } else {
          //take the requested path and remove the / from it to render
        res.render(req.path.substring('/'.length));
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

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, result) {
    try{
      if (username === result.username && password === result.password) {
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



module.exports = {
  register: register,
  login: login,
  choices: choices,
  matches: matches,
  checkAuth: checkAuth
};
