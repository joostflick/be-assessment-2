var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema(
  {
    username: {type: String, required: true, max: 20},
    password: {type: String, required: true, max: 20},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    gender: {type: String},
    matches: [{type: String}],
    choices: {type: Number},
    image: {type: String}
  }
);

module.exports = mongoose.model('User', User);
