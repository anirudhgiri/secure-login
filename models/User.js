let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type: String, required:true},
    username: {type: String, required: true, unique: true},
    pwdHash: {type: String, required: true},
    pwdSalt: {type: String, required: true}  
});

module.exports = mongoose.model('User', userSchema);