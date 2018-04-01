var User = require('../models/user')

function register(req, res) {
  var user = req.body;
  return User.findOne({username: user.username}, function(err, result){
    if(err){
      return res.sendStatus(400);
    }
    if(result){
      return res.sendStatus(400);
    }
    User.create(user, function(err, newUser){
      if(err){
        return res.sendStatus(400);
      }
      return res.sendStatus(200);
    });
  });
}

 function login(req, res) {
  var user = req.body;
  console.log(user.username, user.password);

  User.findOne({username: user.username, password: user.password}, function(err, result){
    if(err){
      return res.sendStatus(400);
    }
    if(!res){
      return res.sendStatus(400);
    }
    return res.sendStatus(200);
  });
}


module.exports = {
  register: register,
  login: login
};
