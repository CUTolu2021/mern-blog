const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    fullname: {type: String, required: true},
    username: {type: String, required: true, unique: true, min: 4},
    password: {type: String, required: true},
});


const Usermodel = mongoose.model('User', UserSchema);
module.exports = Usermodel;