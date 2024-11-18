const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    title: {type: String, required: true},
    summary: {type: String, required: true},
    content: {type: String, required: true},
    cover: {type: String, required: false},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true});

const Postmodel = mongoose.model('Post', PostSchema);
module.exports = Postmodel;