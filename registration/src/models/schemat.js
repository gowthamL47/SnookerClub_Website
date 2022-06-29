const mongoose = require ('mongoose');
const validator = require('validator');

const techerSchema = mongoose.Schema({
    email:String,
    password : Number
})

const Lecturer = new mongoose.model('professors', techerSchema);

module.exports= Lecturer;