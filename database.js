var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://joostflick:JFlick96@ds127321.mlab.com:27321/datesite';
mongoose.connect(mongoDB);
