var User = require('../models/user');

function findMatches(req, res) {
  var id = req.session.userId;
  //If no session ID is found the user is unauthorized to view this,
  //if the user is authorized check which user is requesting its matches
  if (!id){
    res.redirect('unauthorized');
  } else {
  User.findById(id).exec(function (error, user) {
    //If the user hasn't made any choices notify user
    if (!user.choices){
      res.render("message", {message: "You haven't made any choices yet!", redirect: "/"});
    } else {
    var choices = user.choices;
    //Find all users with the same choices but a differen id
    User.find({choices: choices, _id: {$ne: user.id}}).exec(function (error, matches) {
      //Render matches with the found matches
      res.render('matches', {matches: matches});

    });
  }
  });
}
}

function addConnection(req, res) {
  console.log(req.body.user);
  var id = req.body.user;

}

module.exports = {
  findMatches: findMatches,
  addConnection: addConnection
};
