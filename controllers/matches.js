var User = require('../models/user');

function findMatches(req, res) {
  var id = req.session.userId;
  if (!req.session){
    res.sendStatus(400);
  }
  User.findById(id).exec(function (error, user) {
    if(!user){
      res.sendStatus(400);
    } else {
    var choices = user.choices;
    User.find({ choices: choices}).exec(function (error, matches) {
      res.render('matches', {matches: matches});

    });
  }
  });
}

module.exports = {
  findMatches: findMatches
};
