var User = require('../models/user');

//Find users with the same choices as current user
function findMatches(req, res) {
  var id = req.session.userId;
  //If no session ID is found the user is unauthorized to view this,
  //if the user is authorized check which user is requesting its matches
  if (!id) {
    res.redirect("unauthorized");
  } else {
    User.findById(id).exec(function(error, user) {
      //If the user hasn't made any choices notify user
      if (!user.choices) {
        res.render("message", {
          message: "You haven't made any choices yet!",
          redirect: "/"
        });
      } else {
        var choices = user.choices;
        //Find all users with the same choices but a differen id
        User.find({
          choices: choices,
          _id: {
            $ne: user.id
          }
        }).exec(function(error, matches) {
          //Check if there are any matches
          if (matches[0] != null) {
            //Render matches with the found matches
            res.render("matches", {
              matches: matches
            });
          } else {
            res.render("message", {
              message: "Apparently no one has the same opinion as you have, if you check back later we might have some new matches for you!",
              redirect: "/"
            });
          }
        });
      }
    });
  }
}

//Add selected user to current user's connections
function addConnection(req, res) {
  //get id of selected user and current user
  var idConnection = req.body.user;
  var id = req.session.userId;
  //find current user and add selected user to connections
  User.findOneAndUpdate({
    _id: id
  }, {
    $addToSet: {
      connections: idConnection
    }
  }, function(err, doc) {
    if (err) {
      return res.sendStatus(400);
    }
    res.render("message", {
      message: "Succesfully added to your connections!",
      redirect: "/connections"
    });

  });
}

function getConnections(req, res) {
  var id = req.session.userId;
  //If no session ID is found the user is unauthorized to view this,
  //if the user is authorized check which user is requesting its connections
  if (!id) {
    res.redirect('unauthorized');
  } else {
    User.findById(id).exec(function(error, user) {
      console.log(user.connections);
      //If the user hasn't made any connections yet notify user
      if (!user.connections[0]) {
        res.render("message", {
          message: "You don't have any connections yet!",
          redirect: "/"
        });
      } else {
        //Find and show connections
        User.find({
          _id: {
            $in: user.connections
          }
        }, function(err, results) {
          res.render("connections", {
            connections: results
          });
        });
      }
    });
  }
}

module.exports = {
  findMatches: findMatches,
  addConnection: addConnection,
  getConnections: getConnections
};
