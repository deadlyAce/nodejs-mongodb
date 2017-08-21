var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');

var blogSchema = new mongoose.Schema({
    username: {type: String, unique:true}, // unique 保证数据的唯一，但有时候不管用
    classnumber:String,
    password: String,
    email:String,
    nation:String,
    interest:String,
    gender:String,
    count:String,
    role:String
}, {collection: 'user'});

var registerd = mongoose.model('registerd', blogSchema);

module.exports = registerd;