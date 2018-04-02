var User = require('../models/user');

function addChoices(req, res) {
  console.log(req.body);
  var option1 = req.body.select;
  var option2 = req.body.select2;
  var option3 = req.body.select3;
  // determine choices based on a string of 1's and 0's
  var newChoices = option1 + option2 + option3;
  console.log(req.session.userId);
  // check which user is logged in atm
  User.findById(req.session.userId).exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          res.render('unauthorized');
        } else {
          console.log(newChoices);
          // if user is logged in update his choices field with the choices of the form]
          User.findOneAndUpdate({_id: user._id}, {$set: {choices: newChoices}}, function(err, doc) {
            return res.status(200);
            if (err) {
              console.log("Something wrong when updating data!");
            }
            console.log(doc);
          });
        }

      }
    });
  return res.status(400);
}

module.exports = {
  addChoices: addChoices
};
