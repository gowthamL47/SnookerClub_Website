const mongoose = require ('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    
    
    name: {
        type:String,
        required:true,
        minlength:3
    },
    year : 
{
type:Number
},

    USN : {
     type:String,
     min:10,
     max:10,
     unique:false
    },

    email: {
        type:String,
        required:true,
        unique:false
    },

    phone: {
        type:Number,
        // min:10,
        // max:10,
        required:true
    },

    aggrigatepu2marks: {
        type: Number,
        
        // required:true
    },

    aggrigateSSLCmarks: {
        type:Number,
        // required:true
    },

    FathersName: {
        type:String,
        required:true
    },

    ParentsPhoneNumber: {
        type:Number,
        // min:10,
        // max:10,
        // required:true 
    }
    
    // ,
    // password: {
    //     type:String,
    //     required:true
    // },
    // confirmpassword: {
    //     type:String,
    //     required:true
    // }


    // name:String,
    // USN:String,
    // email:String,
    // phone:Number,
    // aggrigatepu2marks:Number,
    // aggrigateSSLCmarks: Number,
    // FathersName:String,
    // ParentsPhoneNumber: Number


    

})

const Student = new mongoose.model('1year' , studentSchema);


module.exports=Student;