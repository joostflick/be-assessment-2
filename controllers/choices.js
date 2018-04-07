var User = require('../models/user');

//Add users choices to db
function addChoices(req, res) {
  //Create a string consisting of the 3 choices, for example 101
  var newChoices = req.body.select + req.body.select2 + req.body.select3;
  var id = req.session.userId;
  //If no user is logged on tell them they arent authorized, otherwise find the
  //user that is logged in and set their choices to the choices they just made
  //When the choices are updated redirect the user to their matches
  if(!id){
    res.render('unauthorized');
  } else {
  User.findOneAndUpdate({_id: id}, {$set: {choices: newChoices}}, function(err, doc) {
    if (err) {
      return res.sendStatus(400);
    }
    res.redirect('/matches');

  });
}
}

module.exports = {
  addChoices: addChoices
};
