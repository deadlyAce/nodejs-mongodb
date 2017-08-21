var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/blog'); 在registerd-mongo.js中已经创建由mongo数据库的连接，不需要再重新打开数据库的连接

var blogSchema = new mongoose.Schema({
    username: String, // unique 保证数据的唯一，但有时候不管用
    question: String,
    time:String,
    answer:[],
    answerData:[],
    answerPost:[]
}, {collection: 'question'});

var question = mongoose.model('question', blogSchema);

module.exports = question;  
