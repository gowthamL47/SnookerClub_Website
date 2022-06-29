const mongoose = require('mongoose');
const validator = require('validator');

const marksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    usn:
    {
        type: String,
        required: true,
        unique: true
    },
    subject1: Number,
    subject2:  Number,
    subject3:  Number,
    subject4:  Number,
    subject5:  Number,
    subject6:  Number,
    subject7:  Number,
    subject8:  Number
})

const Marks = new mongoose.model('studentmarks', marksSchema);


module.exports = Marks;