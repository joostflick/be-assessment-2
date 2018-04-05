var User = require('../models/user');

function addChoices(req, res) {
  var newChoices = req.body.select + req.body.select2 + req.body.select3;
  var id = req.session.userId;
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
