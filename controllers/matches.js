var User = require('../models/user');

function findMatches(req, res) {
  var id = req.session.userId;
  User.findById(id).exec(function (error, user) {
    var choices = user.choices;
    User.find({ choices: choices}).exec(function (error, matches) {
      res.render('matches', {matches: matches});
    });
  });
}

module.exports = {
  findMatches: findMatches
};
