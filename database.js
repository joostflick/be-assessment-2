var mongoose = require('mongoose');

//Set up mongoose connection
var mongoDB = 'mongodb://joostflick2:Augurk10@ds127321.mlab.com:27321/datesite';
mongoose.connect(mongoDB);
